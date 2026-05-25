import React from "react";
import { Coins } from "lucide-react";

interface RequiredSolAlertProps {
  requiredSol?: string;
}

export const RequiredSolAlert: React.FC<RequiredSolAlertProps> = ({
  requiredSol,
}) => {
  if (!requiredSol) return null;

  return (
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 mb-2">
      <div className="flex justify-between items-center gap-2">
        <span className="text-sm font-medium">Required SOL: {requiredSol}</span>
      </div>
    </div>
  );
};
