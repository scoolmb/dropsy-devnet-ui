"use client";

import { FaRocket, FaMagic, FaCodeBranch } from "react-icons/fa";
import ClaimMerkle from "./comps/claim-merkle-builder";

export default function MerklePage() {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header 
        <SimpleHeroSection />
        */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Merkle Tree Builder
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Generate Merkle trees for airdrop eligibility verification.
          </p>
        </div>
        {/* Cards Grid */}
        <ClaimMerkle />
        {/* Info Section */}
        <div className="mt-12 rounded-xl border border-gray-800 dark:bg-gray-900/30 p-6">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            How It Works
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">1. Upload</div>
              <p className="text-sm text-gray-400">
                Upload your CSV file with wallet addresses and amounts
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                2. Generate
              </div>
              <p className="text-sm text-gray-400">
                The system builds the Merkle tree, calculates the root hash and
                generate proofs
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">3. Use</div>
              <p className="text-sm text-gray-400">
                Copy the Merkle root to use it where it needed and don&apos;t
                forget to save proofs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SimpleHeroSection() {
  return (
    <div className="relative py-16 md:py-24 lg:py-32 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 mb-8">
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
              ✨ No-Code Builder
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Create Airdrops
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Without Writing Code
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Launch token distributions, build merkle trees, and manage
            whitelists with our intuitive drag-and-drop interface. Perfect for
            communities and projects of all sizes.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20">
                <FaRocket className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Airdrop Master
              </span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/10 dark:bg-purple-500/20">
                <FaMagic className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Create Airdrop
              </span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-xl bg-green-500/10 dark:bg-green-500/20">
                <FaCodeBranch className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Merkle Trees
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Start Building
            </button>

            <button className="px-8 py-3 bg-white/10 dark:bg-gray-800 hover:bg-white/20 dark:hover:bg-gray-700 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-all duration-300">
              View Documentation
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  10,000+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Airdrops Created
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  $500M+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Tokens Distributed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  99.9%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Success Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ＜5min
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Setup Time
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
