// app/merkle/page.tsx
"use client";

import React, { useState } from "react";
import {
  Shield,
  Upload,
  FileText,
  Users,
  Copy,
  Check,
  Download,
} from "lucide-react";

type ViewState = "upload" | "processing" | "results";

export default function ClaimMerkle() {
  const [viewState, setViewState] = useState<ViewState>("upload");
  const [root, setRoot] = useState<string>("");
  const [totalAddresses, setTotalAddresses] = useState<number>(0);
  const [proofs, setProofs] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setViewState("processing");
    setError("");

    try {
      const csvText = await file.text();

      // Create worker
      const worker = new Worker(
        new URL("@/workers/merkle-claim.worker.ts", import.meta.url),
        { type: "module" },
      );

      worker.postMessage({
        csvText,
        withProofs: true,
      });

      worker.onmessage = (e) => {
        if (e.data.success) {
          setRoot(e.data.root);
          setTotalAddresses(e.data.total);
          setProofs(e.data.proofs || []);
          setViewState("results");
        } else {
          setError(e.data.error || "Failed to process file");
          setViewState("upload");
        }
        worker.terminate();
      };

      worker.onerror = (error) => {
        console.error("Worker error:", error);
        setError("Error in processing worker");
        setViewState("upload");
        worker.terminate();
      };
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to read file");
      setViewState("upload");
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadProofs = () => {
    if (!proofs.length) return;

    const data = {
      merkleRoot: root,
      totalAddresses,
      generatedAt: new Date().toISOString(),
      proofs: proofs.map((p) => ({
        index: p.index,
        address: p.address,
        amount: p.amount,
        proof: p.proof,
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `merkle-proofs-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setViewState("upload");
    setRoot("");
    setTotalAddresses(0);
    setProofs([]);
    setError("");
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}

        {/* Main Content */}
        {viewState === "upload" && (
          <UploadSection onFileSelect={handleFileUpload} />
        )}

        {viewState === "processing" && <ProcessingSection />}

        {viewState === "results" && (
          <ResultsSection
            root={root}
            totalAddresses={totalAddresses}
            proofs={proofs}
            copied={copied}
            onCopy={copyToClipboard}
            onDownload={downloadProofs}
            onReset={reset}
          />
        )}

        {/* Info Section */}
        <div className="mt-12 p-6 bg-gray-800/30 border border-gray-700 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-400" />
            CSV Format
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <code className="text-sm text-gray-300 font-mono">
                wallet,amount
                <br />
                7f8abc...xyz,1
                <br />
                9djklm...pqr,2.5
                <br />
                ...
              </code>
            </div>
            <p className="text-sm text-gray-400">
              Each line must contain a wallet address and amount separated by a
              comma. Header row is optional. Example: wallet,amount
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Upload Section Component
function UploadSection({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Drag & Drop Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
          dragActive
            ? "border-blue-500 bg-blue-500/10"
            : "border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="mb-6">
          <div className="inline-flex items-center justify-center p-4 bg-gray-800 rounded-full mb-4">
            <Upload className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Upload CSV File
          </h3>
          <p className="text-gray-400 mb-6">
            Drag & drop your CSV file or click to browse
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.txt"
          onChange={handleChange}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:opacity-90 transition-all"
        >
          Choose File
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Supports CSV or text files formatted as: wallet,amount
        </p>
      </div>
    </div>
  );
}

// Processing Section Component
function ProcessingSection() {
  return (
    <div className="text-center py-12">
      <div className="inline-block mb-6">
        <div className="relative">
          <div className="h-24 w-24 border-4 border-blue-500/30 rounded-full"></div>
          <div className="h-24 w-24 border-4 border-blue-500 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-white mb-3">
        Building Merkle Tree
      </h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Processing wallet addresses and generating cryptographic proofs...
      </p>

      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
        <div className="h-1 w-1 rounded-full bg-gray-600 animate-pulse"></div>
        <div
          className="h-1 w-1 rounded-full bg-gray-600 animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="h-1 w-1 rounded-full bg-gray-600 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
}

// Results Section Component
function ResultsSection({
  root,
  totalAddresses,
  proofs,
  copied,
  onCopy,
  onDownload,
  onReset,
}: {
  root: string;
  totalAddresses: number;
  proofs: any[];
  copied: boolean;
  onCopy: (text: string) => void;
  onDownload: () => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Users className="h-5 w-5 text-blue-400" />
            <div className="text-sm text-gray-400">Total Addresses</div>
          </div>
          <div className="text-3xl font-bold text-white text-center">
            {totalAddresses}
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-green-400" />
            <div className="text-sm text-gray-400">Proofs Generated</div>
          </div>
          <div className="text-3xl font-bold text-white text-center">
            {proofs.length}
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="h-5 w-5 text-purple-400" />
            <div className="text-sm text-gray-400">Tree Height</div>
          </div>
          <div className="text-3xl font-bold text-white text-center">
            {Math.ceil(Math.log2(totalAddresses)) + 1}
          </div>
        </div>
      </div>

      {/* Merkle Root */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Merkle Root</h3>
          <button
            onClick={() => onCopy(root)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all text-sm"
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

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
          <code className="text-sm text-gray-300 font-mono break-all">
            {root}
          </code>
        </div>

        <p className="mt-3 text-sm text-gray-400">
          This root should be stored in your airdrop master for whitelist
          verification.
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onDownload}
          className="flex items-center justify-center gap-3 bg-linear-to-r from-green-600 to-green-700 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-all"
        >
          <Download className="h-5 w-5" />
          Download All Proofs (JSON)
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center gap-3 border border-gray-700 bg-gray-800 text-gray-300 font-semibold py-4 px-6 rounded-xl hover:bg-gray-700 transition-all"
        >
          Generate Another Tree
        </button>
      </div>

      {/* Preview */}
      {proofs.length > 0 && (
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Proof Preview ({proofs.length} total)
          </h3>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {proofs.slice(0, 5).map((proof, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-sm text-gray-400">
                    Address #{index + 1}
                  </div>
                  {/*
                  <button
                    onClick={() => onCopy(JSON.stringify(proof, null, 2))}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Copy Proof
                  </button>
                   */}
                </div>
                <code className="text-xs text-gray-300 font-mono truncate block">
                  {proof.address}
                </code>
                <div className="mt-2 text-xs text-gray-500">
                  {proof.proof.length} hash steps
                </div>
              </div>
            ))}

            {proofs.length > 5 && (
              <div className="text-center text-gray-500 text-sm py-2">
                ... and {proofs.length - 5} more proofs
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instructions 
      <div className="bg-blue-900/10 border border-blue-800/30 rounded-xl p-6">
        <h4 className="font-semibold text-blue-400 mb-3">Next Steps</h4>
        <ol className="space-y-2 text-sm text-blue-300/80">
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5"></div>
            <span>Deploy the Merkle root to your smart contract</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5"></div>
            <span>Distribute individual proofs to whitelisted users</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5"></div>
            <span>Users submit their proof to verify whitelist status</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5"></div>
            <span>Keep the downloaded JSON file as backup</span>
          </li>
        </ol>
      </div>*/}
    </div>
  );
}
