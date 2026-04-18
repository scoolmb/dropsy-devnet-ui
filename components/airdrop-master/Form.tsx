import React from "react";
import { Card } from "@/components/ui/card";
//import { Separator } from "@/components/ui/separator";
import { DollarSign, Lock, Settings } from "lucide-react";
import { UiWalletAccount } from "@wallet-standard/react";
import { useAirdropMasterForm } from "./useAirdropMasterForm";
import { AirdropMasterHeader } from "./Header";
import { DeployAirdropMasterCTA } from "./deploy-cta";
import { AirdropMasterConfig } from "./Basic-Setting";

const AirdropMasterForm = ({
  account,
  discountData,
}: {
  account: UiWalletAccount;
  discountData: any;
}) => {
  const { form, onSubmit } = useAirdropMasterForm(account, discountData);

  // Get the wallet public key in Base58
  const walletAddress = account.address;

  // Find the proof entry for this wallet
  const discountEntry = discountData?.proofs?.find(
    (p: any) => p.address === walletAddress,
  );

  // Convert proof from hex to Uint8Array for Anchor
  const discountProof: Uint8Array[] | undefined = discountEntry?.proof?.map(
    (hex: string) => Uint8Array.from(Buffer.from(hex, "hex")),
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="bg-linear-to-br p-5 from-gray-500/50 to-white dark:from-black/50 dark:to-black backdrop-blur-sm min-h-92">
        <AirdropMasterHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <div className="p-4 border rounded-lg bg-linear-to-br from-gray-500/50 to-white dark:from-black/50 dark:to-black">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Scope
              </span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              All Airdrops
            </p>
            <p className="text-xs text-gray-500">Controls all child airdrops</p>
          </div>

          <div className="p-4 border rounded-lg bg-linear-to-br  from-gray-500/50 to-white dark:from-black/50 dark:to-black">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Revenue Model
              </span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Fee Collection
            </p>
            <p className="text-xs text-gray-500">Earns from all operations</p>
          </div>

          <div className="p-4 border rounded-lg bg-linear-to-br from-gray-500/50 to-white dark:from-black/50 dark:to-black">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Authority
              </span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Master Account
            </p>
            <p className="text-xs text-gray-500">
              Controls access & permissions
            </p>
          </div>
        </div>

        <AirdropMasterConfig register={form.register} />
        <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-t">
          <div className="container flex justify-center mx-auto px-6 py-4">
            <div className="self-center md:max-w-1/2 lg:max-w-1/3 ">
              <DeployAirdropMasterCTA
                isSubmitting={form.formState.isSubmitting}
              />
            </div>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default AirdropMasterForm;
