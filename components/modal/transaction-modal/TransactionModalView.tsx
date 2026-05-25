import React from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { TransactionModalProps } from "./types";
//import { TransactionHeader } from "./TransactionHeader";
import { TransactionDetailsCard } from "./TransactionDetails";
import { RequiredSolAlert } from "./RequiredSolAlert";
//import { SignatureChecklist } from './SignatureChecklist';
import { TransactionActions } from "./TransactionActions";
import { TransactionHeader } from "./TransactionModalHeader";

export const TransactionModalView: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSign,
  transactionDetails,
  isLoading = false,
}) => {
  const handleCancel = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md w-full">
        <TransactionHeader />
        <div className="py-2">
          <TransactionDetailsCard details={transactionDetails} />
          <RequiredSolAlert requiredSol={transactionDetails.requiredSol} />
        </div>

        <DialogFooter>
          <TransactionActions
            onCancel={handleCancel}
            onSign={onSign}
            isLoading={isLoading}
          />
        </DialogFooter>

        <p className="text-center text-xs text-muted-foreground pt-2">
          Your signature is secure and non-custodial
        </p>
      </DialogContent>
    </Dialog>
  );
};
