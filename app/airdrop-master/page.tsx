"use client";

import React from "react";
import { AuthWalletGate } from "@/components/auth-gate";
import { Rocket } from "lucide-react";
import AirdropMasterForm from "@/components/airdrop-master/Form";
import { CardContent } from "@/components/ui/card";
import { useSolana } from "@/lib/context/solana-provider";
import { useCheckEligibility } from "@/features/eligibility/use-check-eligibility";

export default function CreateAirdropMasterPage() {
  const { selectedAccount } = useSolana();
  const { data: eligibilityResult, isLoading: eligibilityLoading } =
    useCheckEligibility(selectedAccount?.address);

  const hasWallet = !!selectedAccount;
  const isEligible = !!eligibilityResult;
  /*const [discountData, setDiscountData] = useState<Record<
    string,
    unknown
  > | null>(null);*/

  return (
    <div className="p-6">
      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-6xl mx-auto ">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Rocket className="w-10 h-10 text-yellow-400 animate-pulse" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-yellow-500">
                AirdropMaster
              </h1>
            </div>
            <p className="text-gray-400">
              Initialize a root configuration that governs all airdrops created
              within your ecosystem
            </p>
          </div>
          <CardContent className=" my-4 flex items-center justify-between p-6 border rounded-xl bg-linear-to-r from-white-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                  About Airdrop Masters
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Each master controls its own ecosystem of airdrops</li>
                  <li>
                    • Airdrop Master Creator earn fees from all operations under
                    their domain
                  </li>
                  <li>
                    • Partners can run independent monetized airdrop platforms
                  </li>
                  <li>• Fully decentralized and modular architecture</li>
                  <li>• Fees sent directly to the Treasury address</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <h3
            className={`text-lg font-semibold ${
              hasWallet && isEligible ? "text-green-800" : "text-gray-800"
            }`}
          >
            {hasWallet && isEligible
              ? "Wallet is Eligible!"
              : "Wallet is Not Eligible"}
          </h3>

          <AuthWalletGate>
            {(account) => <AirdropMasterForm account={account} />}
          </AuthWalletGate>
        </div>
      </div>
    </div>
  );
}
