import React from "react";
import { Button } from "@/components/ui/button";

interface TransactionActionsProps {
  onCancel: () => void;
  onSign: () => void;
  isLoading?: boolean;
}

export const TransactionActions: React.FC<TransactionActionsProps> = ({
  onCancel,
  onSign,
  isLoading,
}) => {
  return (
    <div className="flex w-full justify-between items-center gap-3">
      <Button
        variant="outline"
        className="flex-1"
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button
        className="flex-1 bg-yellow-600 hover:bg-amber-700 cursor-pointer"
        onClick={onSign}
        disabled={isLoading}
      >
        {isLoading ? "Signing..." : "Sign Transaction"}
      </Button>
    </div>
  );
};
