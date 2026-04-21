import DropsyInput from "@/components/input/dropsy-input";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AirdropMaster } from "@dropsy/airdrop";
import { Address } from "gill";
import { Key, Users } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

interface AirdropConfigProps {
  register: UseFormRegister<{
    airdropMaster: string;
    treasury: string;
    mint: string;
    merkleRoot: string;
    delegateAuthority: string;
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    version?: string | undefined;
    mutable?: string | undefined;
    delegatePermissions?: string | undefined;
  }>;
  airdropMaster?: AirdropMaster;
  airdropMasterAddress?: Address;
}

export function MasterConfig({
  register,
  airdropMaster,
  airdropMasterAddress,
}: AirdropConfigProps) {
  /*airdropMaster: address(data.airdropMaster),
          masterCreator: address("7B958HYBCDM8xCGzUu3nXXV4D7iQeQNUXnhBYwuPeFZs"),
          treasury: address(data.treasury),
          */
  return (
    <div className="space-y-6">
      {/* master Section */}
      <div className="grid md:grid-cols-1 gap-6">
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Airdrop Master :
              </Label>
              <DropsyInput
                label="Airdrop Master Address : "
                icon={<Key className="w-4 h-4" />}
                {...register("airdropMaster")}
                //placeholder="Enter airdrop master address"
                value={airdropMasterAddress || ""}
                //error={errors.airdropMaster?.message}
                readAbout={{
                  title: "Airdrop Master",
                  description: "The program account that manages this airdrop",
                }}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Airdrop Master Treasury :
              </Label>
              <DropsyInput
                label="Airdrop Master Treasury"
                icon={<Users className="w-4 h-4" />}
                {...register("treasury")}
                //placeholder="Enter treasury address"
                value={airdropMaster?.treasury || ""}
                //error={errors.treasury?.message}
                readAbout={{
                  title: "Airdrop Master Treasury",
                  description: "Address that receives fees from claims",
                }}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Airdrop Master Creator Address :
              </Label>

              <DropsyInput
                label="Airdrop Master Creator Address"
                icon={<Key className="w-4 h-4" />}
                {...register("mint")}
                //placeholder="Airdrop Master Creator address"
                value={airdropMaster?.treasury || ""}
                //error={errors.mint?.message}
                readAbout={{
                  title: "Creator Address",
                  description: "",
                }}
              />
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
