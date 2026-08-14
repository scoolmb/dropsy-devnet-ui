"use client";

import { useState } from "react";
import { Shield, Gift, Key, Users } from "lucide-react";
import UseCaseCard from "./comps/use-case";
import WalletBuilder from "./comps/wallet-builder";
import AirdropBuilder from "./comps/airdrop-builder";
import { FaRocket, FaMagic, FaCodeBranch } from "react-icons/fa";
import { motion } from "framer-motion";
import ClaimMerkle from "./comps/claim-merkle-builder";

type View = "main" | "wallet" | "airdrop";

export default function MerklePage() {
  const [currentView, setCurrentView] = useState<View>("main");

  if (currentView === "wallet") {
    return <WalletBuilder />;
  }

  if (currentView === "airdrop") {
    return <ClaimMerkle />;
  }

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
            Generate Merkle trees for blockchain applications. Choose your use
            case below.
          </p>
        </div>
        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 max-w-6xl">
          <UseCaseCard
            title="Wallet Whitelisting"
            description="Create a Merkle root for wallet address whitelisting. Perfect for exclusive access control and permissioned distributions."
            icon={Shield}
            useCases={[
              "Airdrop Master whitelisting",
              "NFT allowlist verification",
            ]}
            onClick={() => setCurrentView("wallet")}
            variant="outline"
          >
            <div className="mt-4 text-sm text-blue-400">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                <span>Input: List of wallet addresses only</span>
              </div>
            </div>
          </UseCaseCard>

          <UseCaseCard
            title="Airdrop Claim Eligibility"
            description="Generate Merkle proofs for token airdrop claims. Each wallet gets a unique proof for their allocated amount."
            icon={Gift}
            useCases={[
              "Token airdrop distributions",
              "Vesting schedule claims",
            ]}
            onClick={() => setCurrentView("airdrop")}
          >
            <div className="mt-4 text-sm text-green-400">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Input: Wallet addresses with token amounts</span>
              </div>
            </div>
          </UseCaseCard>
        </div>
        {/* Info Section */}
        <div className="mt-12 rounded-xl border border-gray-800 bg-gray-900/30 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            How It Works
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">1. Upload</div>
              <p className="text-sm text-gray-400">
                Upload your CSV file with wallet addresses (and amounts if
                needed)
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
                Copy the Merkle root to use it where it needed and dont forget
                to save proofs
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 mb-8"
          >
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
              ✨ No-Code Builder
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Create Airdrops
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Without Writing Code
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Launch token distributions, build merkle trees, and manage
            whitelists with our intuitive drag-and-drop interface. Perfect for
            communities and projects of all sizes.
          </motion.p>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
          >
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
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-3 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Start Building
            </button>

            <button className="px-8 py-3 bg-white/10 dark:bg-gray-800 hover:bg-white/20 dark:hover:bg-gray-700 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-all duration-300">
              View Documentation
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
