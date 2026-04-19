// workers/merkle-airdrop.worker.ts
/// <reference lib="webworker" />

import { buildClaimMerkleTree, hashWalletLeaf } from "@/lib/helper/merkle";
import { isAddress } from "gill";

interface AirdropEntry {
    address: string;
    amount: number;
}

interface WorkerMessage {
    csvText: string;
    withProofs: boolean;
}

interface WorkerResponse {
    success: boolean;
    root?: string;
    total?: number;
    totalAmount?: number;
    proofs?: Array<{
        address: string;
        amount: number;
        proof: string[];
        index: number;
    }>;
    error?: string;
}

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
    const { csvText, withProofs } = event.data;

    try {
        // 1. Parse CSV for airdrop entries (address,amount)
        const lines = csvText.split(/\r?\n/);
        const entries: AirdropEntry[] = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                // Skip header if present
                if (i === 0 && (line.includes('wallet') || line.includes('address'))) {
                    continue;
                }

                const parts = line.split(',').map(p => p.trim());
                if (parts.length >= 2) {
                    const address = parts[0];
                    const amount = parseFloat(parts[1]);

                    // Validate address and amount
                    if (address && isAddress(address) && !isNaN(amount) && amount > 0) {
                        entries.push({ address, amount });
                    }
                }
            }
        }

        if (entries.length === 0) {
            throw new Error("No valid address/amount entries found in CSV. Expected format: wallet_address,amount");
        }

        // 2. Check for duplicates (same address with different amounts should be separate entries)
        // Note: Same address with same amount will be considered duplicates
        const uniqueEntries: AirdropEntry[] = [];
        const seen = new Set<string>();

        entries.forEach(entry => {
            const key = `${entry.address}:${entry.amount}`;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueEntries.push(entry);
            }
        });

        const duplicatesRemoved = entries.length - uniqueEntries.length;

        // 3. Hash each entry (address + amount)
        const leaves = uniqueEntries.map((entry, index) =>
            hashWalletLeaf(index, entry.address, entry.amount)
        );

        // 4. Build Merkle tree
        const { tree, root } = buildClaimMerkleTree(leaves);

        // 5. Generate proofs if requested
        let proofs;
        if (withProofs) {
            proofs = uniqueEntries.map((entry, index) => {
                const leafHash = hashWalletLeaf(index, entry.address, entry.amount)
                return {
                    address: entry.address,
                    amount: entry.amount,
                    proof: tree
                        .getProof(leafHash)
                        .map((p) => p.data.toString("hex")),
                    index
                };
            });
        }

        // 6. Calculate total amount
        const totalAmount = uniqueEntries.reduce((sum, entry) => sum + entry.amount, 0);

        // 7. Send response
        const response: WorkerResponse = {
            success: true,
            root,
            total: uniqueEntries.length,
            totalAmount,
            proofs,
        };

        // Optional: Log warning about duplicates
        if (duplicatesRemoved > 0) {
            console.warn(`Removed ${duplicatesRemoved} duplicate entries`);
        }

        self.postMessage(response);

    } catch (err: any) {
        const response: WorkerResponse = {
            success: false,
            error: err.message ?? "Failed to build Merkle tree for airdrop",
        };
        self.postMessage(response);
    }
};