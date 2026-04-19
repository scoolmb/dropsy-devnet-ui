"use client";

import { useRef, useState } from "react";
import {
  Gift,
  Download,
  Copy,
  Check,
  FileText,
  AlertCircle,
} from "lucide-react";
import { isAddress } from "gill";

export default function AirdropBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const [root, setRoot] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>("");
  const [stats, setStats] = useState<{
    wallets: number;
    totalAmount: string;
  } | null>(null);

  async function handleFile(file: File) {
    if (!file) return;

    setLoading(true);
    setError("");
    setRoot("");
    setStats(null);

    try {
      const text = await file.text();
      const lines = text
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      const startIndex = lines[0].toLowerCase().includes("wallet") ? 1 : 0;
      // Validate file has content
      if (lines.length === 0) {
        setError("CSV file is empty");
        setLoading(false);
        return;
      }

      // Parse CSV with wallet,amount format
      const entries = lines.slice(startIndex).map((line, index) => {
        const parts = line.split(",");

        if (parts.length < 2) {
          throw new Error(`Invalid row at line ${index + 1}`);
        }

        const wallet = parts[0].trim();
        const amount = Number(parts[1].replace(/,/g, "").trim());

        return { wallet, amount };
      });

      // Validate
      const invalidRow = entries.find(
        (e) =>
          !e.wallet ||
          !isAddress(e.wallet) ||
          !Number.isFinite(e.amount) ||
          e.amount <= 0,
      );

      if (invalidRow) {
        console.error("Invalid row:", invalidRow);
        setError("Invalid CSV data detected. Check wallet or amount values.");
        setLoading(false);
        return;
      }

      // Calculate stats
      const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);
      setStats({
        wallets: entries.length,
        totalAmount: totalAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      });

      // Initialize CORRECT worker for airdrops
      workerRef.current = new Worker(
        new URL("@/workers/merkle-claim.worker.ts", import.meta.url),
        { type: "module" },
      );

      // Remove the 'type' parameter since new worker doesn't need it
      workerRef.current.postMessage({
        csvText: text,
        withProofs: true,
      });

      workerRef.current.onmessage = (e) => {
        console.log("Worker response:", e.data); // Debug log

        if (e.data.success) {
          setRoot(e.data.root);
          console.log("Root set:", e.data.root);
        } else {
          setError(e.data.error || "Failed to generate merkle tree");
        }
        setLoading(false);
        if (workerRef.current) {
          workerRef.current.terminate();
          workerRef.current = null;
        }
      };

      workerRef.current.onerror = (error) => {
        console.error("Worker error:", error);
        setError("Error in processing worker");
        setLoading(false);
        if (workerRef.current) {
          workerRef.current.terminate();
          workerRef.current = null;
        }
      };
    } catch (error) {
      console.error("Error processing file:", error);
      setError("Failed to read file");
      setLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (root) {
      navigator.clipboard.writeText(root);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadExampleCSV = () => {
    const example = `wallet_address,amount\n3vB...abc,100\n4xY...def,250\n7zW...ghi,50`;
    const blob = new Blob([example], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "airdrop-example.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setRoot("");
    setStats(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-5 py-3 mb-6">
            <Gift className="h-6 w-6 text-green-400" />
            <span className="text-lg font-semibold text-white">
              Airdrop Claim Merkle Tree
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Generate Merkle Proofs
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create a Merkle tree for token airdrop claims. Input wallet
            addresses with corresponding token amounts to generate eligibility
            proofs for your community.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="rounded-lg border-2 border-dashed border-gray-700 bg-gray-900/50 p-8 text-center hover:border-green-600 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              className="hidden"
              disabled={loading}
            />

            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
                <Gift className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Upload Airdrop List
              </h3>
              <p className="mb-4 text-gray-400">
                Upload a CSV file with wallet addresses and token amounts
              </p>

              <div className="mb-4 inline-block rounded-lg bg-gray-800 p-4">
                <code className="text-sm text-gray-300">
                  wallet_address,amount
                </code>
              </div>

              <div className="mt-4">
                <button
                  onClick={downloadExampleCSV}
                  disabled={loading}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 disabled:opacity-50"
                >
                  <FileText className="h-4 w-4" />
                  Download example CSV
                </button>
              </div>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="rounded-lg bg-linear-to-r from-green-600 to-emerald-600 px-8 py-3 font-medium text-white hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {loading ? "Processing..." : "Upload CSV"}
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent mb-4"></div>
              <p className="text-gray-400">
                Building Merkle tree with amounts...
              </p>
            </div>
          )}

          {/* Stats */}
          {stats && !loading && (
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                <div className="text-sm text-gray-500 mb-2">Total Wallets</div>
                <div className="text-3xl font-bold text-white">
                  {stats.wallets}
                </div>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                <div className="text-sm text-gray-500 mb-2">Total Amount</div>
                <div className="text-3xl font-bold text-white">
                  {stats.totalAmount}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {root && (
            <div className="space-y-6">
              {/* Merkle Root */}
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">Merkle Root</h4>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="rounded border border-gray-800 bg-black p-4">
                  <code className="break-all font-mono text-sm text-gray-300">
                    {root}
                  </code>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  This root should be stored in your airdrop contract for
                  verification.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={resetForm}
                  className="flex-1 border border-gray-700 bg-gray-800 text-gray-300 font-semibold py-3 rounded-xl hover:bg-gray-700 transition-all"
                >
                  Generate Another Tree
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
