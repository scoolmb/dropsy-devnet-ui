/// <reference lib="webworker" />


import { buildWLMerkleTree,  hashLeaf,  hashWalletLeaf } from "@/lib/helper/merkle";
import { sha256 } from "@noble/hashes/sha2";
import { Address, getPublicKeyFromAddress, isAddress } from "gill";
import MerkleTree from "merkletreejs";

// Type definitions for clarity
interface WorkerMessage {
    csvText: string;
    withProofs: boolean;
}

interface WorkerResponse {
    success: boolean;
    root?: string;
    total?: number;
    proofs?: Array<{
        address: string;
        proof: string[];
        index: number;
    }>;
    error?: string;
}

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
    const { csvText, withProofs } = event.data;

    try {
        // 1. Parse CSV (simple, fast)
        const lines = csvText.split(/\r?\n/);
        const addresses: string[] = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                // Take first column as address, ignore rest
                const address = line.split(',')[0].trim();
                if (address && isAddress(address)) {
                    addresses.push(address);
                }
            }
        }

        if (addresses.length === 0) {
            throw new Error("No valid addresses found in CSV");
        }

        // 2. Remove duplicates
        const uniqueAddresses = [...new Set(addresses)];
        const duplicatesRemoved = addresses.length - uniqueAddresses.length;

        // 3. Build Merkle tree
        const { tree, root } = buildWLMerkleTree(uniqueAddresses);

        // 4. Generate proofs if requested
        let proofs;
        if (withProofs) {
            proofs = uniqueAddresses.map((address, index) => ({
                address,
                proof: tree
                    .getProof(hashLeaf(address))
                    .map((p) => p.data.toString("hex")),
                index
            }));
        }

        // 5. Send response
        const response: WorkerResponse = {
            success: true,
            root,
            total: uniqueAddresses.length,
            proofs,
        };

        // Add warning about duplicates if any
        if (duplicatesRemoved > 0) {
            console.warn(`Removed ${duplicatesRemoved} duplicate addresses`);
        }

        self.postMessage(response);

    } catch (err: any) {
        const response: WorkerResponse = {
            success: false,
            error: err.message ?? "Failed to build Merkle tree",
        };
        self.postMessage(response);
    }
};

function hashAddress(address: string): Uint8Array {
  return sha256(new TextEncoder().encode(address));
}