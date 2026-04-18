import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export const AirdropMasterHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Building2 className="w-5 h-5 text-yellow-400" />
        Airdrop Master Configuration
      </CardTitle>

      <CardDescription className="text-gray-400">
        Global configuration and fee control for all airdrops under this master
      </CardDescription>
    </CardHeader>
  );
};
