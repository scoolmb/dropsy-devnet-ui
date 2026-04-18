import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Zap, DollarSign } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface AirdropMasterConfigProps {
  register: UseFormRegister<{
    treasury: string;
    airdropCreateFee: number | null;
    airdropUpdateFee: number | null;
    bitmapCreateFee: number | null;
    claimFee: number | null;
    delegateFee: number | null;
  }>;
}

export function AirdropMasterConfig({ register }: AirdropMasterConfigProps) {
  return (
    <div className="space-y-6">
      {/* Fee Configuration Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Fee Configuration */}
        <CardContent className="space-y-6 p-6 border rounded-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Basic Configuration
                </h3>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Treasury : Fee collection address
              </Label>
              <Input
                //label="Master Treasury"
                {...register("treasury")}
                placeholder="Your fee collection wallet address"
                type="text"
                //icon={<Wallet2Icon className="w-4 h-4" />}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Create Airdrop Fee :
              </Label>
              <Input
                //label="Airdrop Creating Fee"
                {...register("airdropCreateFee")}
                placeholder="ex: 0.01"
                type="number"
                step="0.00001"
                min="0"
                //icon={<span className="text-xs">◎</span>}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Create Claim Map Fee :
              </Label>
              <Input
                //label="CLaimMap Creating Fee"
                {...register("bitmapCreateFee")}
                placeholder="ex: 0.01"
                type="number"
                step="0.00001"
                min="0"
                //icon={<span className="text-xs">◎</span>}
              />
            </div>
          </div>
        </CardContent>

        {/* Advanced Fee Configuration */}
        <CardContent className="space-y-6 p-6 border rounded-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Advanced Configuration
                </h3>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Claim Fee :
              </Label>
              <Input
                {...register("claimFee")}
                //label="Claiming Fee"
                placeholder="ex: 0.01"
                type="number"
                step="0.00001"
                min="0"
                //icon={<span className="text-xs">◎</span>}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Update Airdrop Fee :
              </Label>
              <Input
                //label="Airdrop Update Fee"
                {...register("airdropUpdateFee")}
                placeholder="ex: 0.01"
                type="number"
                step="0.00001"
                min="0"
                // icon={<span className="text-xs">◎</span>}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Delegate Fee :
              </Label>
              <Input
                //label="Delegation Fee"
                {...register("delegateFee")}
                placeholder="ex: 0.01"
                type="number"
                step="0.00001"
                min="0"
                //icon={<span className="text-xs">◎</span>}
              />
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
