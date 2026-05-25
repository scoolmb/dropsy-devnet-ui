import React, { useState } from "react";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Key, Lock, Rocket, Users } from "lucide-react";
import { UiWalletAccount } from "@wallet-standard/react";
import { useAirdropForm } from "./useAirdropForm";
import DropsyInput from "@/components/input/dropsy-input";
import { DeployAirdropMasterCTA } from "../airdrop-master/deploy-cta";
import { Label } from "@/components/ui/label";
import CardWrapper from "@/components/card/card-wrapper";
import {
  TransactionModalView,
  TransactionDetails,
} from "../modal/transaction-modal";
import {
  getAirdropDerivedAddress,
  getClaimMapDerivedAddress,
} from "@/lib/derive";
import { address } from "gill";
import { formatAddress } from "@/lib/utils";

const AirdropForm = ({ account }: { account: UiWalletAccount }) => {
  const { form, onSubmit } = useAirdropForm(account);
  const register = form.register;

  // State for transaction modal
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<any>(null);

  // Transaction details based on form data
  const getTransactionDetails = (formData: any): TransactionDetails => {
    return {
      network: "Solana Devnet",
      action: "Deploy Airdrop",
      from: formatAddress(account.address),
      toProgram: formatAddress(formData.airdropMaster || "New Airdrop Master"),
      requiredSol: "0.01 SOL",
      createdPdas: [
        { type: "Airdrop", address: formData.airdropPda || "airdropPda" },
        { type: "Claim Map", address: formData.claimMapPda || "claimMapPda" },
      ],
    };
  };

  // Handle form submission - open modal instead of direct submission
  const handleFormSubmit = async (formData: any) => {
    const [airdropPda, bump] = await getAirdropDerivedAddress(
      address(account.address),
      address(form.getValues("mint") || ""),
    );
    const [claimMapPda, bump0] = await getClaimMapDerivedAddress(airdropPda, 0);
    // Store form data for later use
    setPendingFormData({ ...formData, airdropPda, claimMapPda });
    // Open transaction confirmation modal
    setIsTransactionModalOpen(true);
  };

  // Handle sign transaction
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
    <>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <CardWrapper>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Airdrop Configuration
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Token Mint Address :{" "}
                  {form.formState.errors.mint && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.mint.message}
                    </p>
                  )}
                </Label>

                <DropsyInput
                  label="Mint Address"
                  icon={<Key className="w-4 h-4" />}
                  {...register("mint")}
                  placeholder="Enter token mint address"
                  readAbout={{
                    title: "Mint",
                    description: "The SPL token mint being airdropped",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amount of Tokens :{" "}
                  {form.formState.errors.amount && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.amount.message}
                    </p>
                  )}
                </Label>

                <DropsyInput
                  label="Amount of Tokens"
                  icon={<Key className="w-4 h-4" />}
                  {...register("amount")}
                  placeholder="Enter amount of tokens"
                  type="number"
                  readAbout={{
                    title: "Amount",
                    description: "The Amount of tokens to be airdropped",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Delegate authority :
                  {form.formState.errors.delegateAuthority && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.delegateAuthority.message}
                    </p>
                  )}
                </Label>

                <DropsyInput
                  label="Delegate Authority"
                  icon={<Users className="w-4 h-4" />}
                  {...register("delegateAuthority")}
                  placeholder="Enter delegate authority"
                  readAbout={{
                    title: "Delegate Authority",
                    description: "Address allowed to manage airdrop on behalf",
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Merkle Root :
                {form.formState.errors.merkleRoot && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.merkleRoot.message}
                  </p>
                )}
              </Label>
              <DropsyInput
                label="Merkle Root"
                icon={<Lock className="w-4 h-4" />}
                {...register("merkleRoot")}
                placeholder="Enter merkle root hash (hex)"
                readAbout={{
                  title: "Merkle Root",
                  description:
                    "Root hash of the Merkle tree containing eligible addresses and amounts",
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Start Date :
                </Label>
                <DropsyInput
                  label="Start Date"
                  icon={<Calendar className="w-4 h-4" />}
                  type="datetime-local"
                  {...register("startsAt")}
                  placeholder="Optional start time"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  End Date :
                </Label>
                <DropsyInput
                  label="End Date"
                  icon={<Calendar className="w-4 h-4" />}
                  type="datetime-local"
                  {...register("endsAt")}
                  placeholder="Optional end time"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <div className="self-center md:max-w-1/2 lg:max-w-1/3 ">
              <DeployAirdropMasterCTA
                isSubmitting={form.formState.isSubmitting}
                title="Deploy Airdrop"
                loadingTitle="Deploying Airdrop..."
              />
            </div>
          </CardFooter>
        </CardWrapper>
      </form>

      {/* Transaction Confirmation Modal */}
      {pendingFormData && (
        <TransactionModalView
          isOpen={isTransactionModalOpen}
          onClose={handleModalClose}
          onSign={handleSignTransaction}
          transactionDetails={getTransactionDetails(pendingFormData)}
          isLoading={isTransactionLoading}
        />
      )}
    </>
  );
};

export default AirdropForm;
