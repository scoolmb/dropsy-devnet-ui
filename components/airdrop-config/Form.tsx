import React, { useState } from "react";
import { Card } from "@/components/ui/card";
//import { Separator } from "@/components/ui/separator";
import { UiWalletAccount } from "@wallet-standard/react";
import { getAirdropConfigDerivedAddress } from "@/lib/derive";
import { formatAddress } from "@/lib/utils";
import {
  TransactionDetails,
  TransactionModalView,
} from "../modal/transaction-modal";
import { useAirdropConfigUpdateForm } from "./useAirdropConfigUpdateForm";
import { AirdropMasterHeader } from "../airdrop-master/Header";
import { DeployAirdropMasterCTA } from "../airdrop-master/deploy-cta";
import { AirdropConfigSettings } from "./airdrop-config-settings";

const AirdropConfigUpdateForm = ({ account }: { account: UiWalletAccount }) => {
  const { form, onSubmit } = useAirdropConfigUpdateForm(account);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<any>(null);

  const getTransactionDetails = (formData: any): TransactionDetails => {
    return {
      network: "Solana Devnet",
      action: "Deploy Airdrop Master",
      from: formatAddress(account.address),
      requiredSol: "0.0021 SOL",
      createdPdas: [
        {
          type: "Airdrop-Master",
          address: formData.airdropMasterPda || "",
        },
      ],
    };
  };

  const handleFormSubmit = async (formData: any) => {
    const [airdropConfigPda, bump] = await getAirdropConfigDerivedAddress();

    // Store form data for later use
    setPendingFormData({ ...formData, airdropConfigPda });
    // Open transaction confirmation modal
    setIsTransactionModalOpen(true);
  };

  const handleSignTransaction = async () => {
    setIsTransactionLoading(true);

    try {
      // Wait a moment to show loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call the original onSubmit with the pending form data
      if (pendingFormData) {
        await onSubmit(pendingFormData);
      }

      // Close modal on success
      //setIsTransactionModalOpen(false);
      //setPendingFormData(null);
    } catch (error) {
      console.error("Transaction failed:", error);
      // You might want to show an error toast here
    } finally {
      setIsTransactionLoading(false);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    if (!isTransactionLoading) {
      setIsTransactionModalOpen(false);
      setPendingFormData(null);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Card className="bg-linear-to-br p-5 from-white-500/50 to-white dark:from-black/50 dark:to-black backdrop-blur-sm min-h-92">
        <AirdropMasterHeader />
        {form.formState.errors && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.protocolTreasury?.message ||
              form.formState.errors.wlRoot?.message}
          </p>
        )}
        <AirdropConfigSettings register={form.register} />
        <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-t">
          <div className="container flex justify-center mx-auto px-6 py-4">
            <div className="self-center md:max-w-1/2 lg:max-w-1/3 ">
              <DeployAirdropMasterCTA
                title="Update Airdrop Config"
                isSubmitting={form.formState.isSubmitting}
              />
            </div>
          </div>
        </div>
      </Card>
      {pendingFormData && (
        <TransactionModalView
          isOpen={isTransactionModalOpen}
          onClose={handleModalClose}
          onSign={handleSignTransaction}
          transactionDetails={getTransactionDetails(pendingFormData)}
          isLoading={isTransactionLoading}
        />
      )}
    </form>
  );
};

export default AirdropConfigUpdateForm;
