import React from "react";
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
import { MasterConfig } from "./Master-Config";
import { AirdropMaster } from "@dropsy/airdrop";
import { Address } from "gill";
import Link from "next/link";
import { Button } from "../ui/button";

const AirdropForm = ({
  account,
  airdropMaster,
  airdropMasterAddress,
}: {
  account: UiWalletAccount;
  airdropMaster?: AirdropMaster;
  airdropMasterAddress?: Address;
}) => {
  const { form, onSubmit } = useAirdropForm(account);
  const register = form.register;

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardWrapper>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Airdrop Configuration
            </CardTitle>
          </CardHeader>
          {/*<MasterConfig
            register={register}
            airdropMaster={airdropMaster}
            airdropMasterAddress={airdropMasterAddress}
          />*/}
          <CardContent className="space-y-6">
            {/*<div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Master Address :{" "}
                {form.formState.errors.mint && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.mint.message}
                  </p>
                )}
              </Label>

              <DropsyInput
                label="Master Address"
                icon={<Key className="w-4 h-4" />}
                {...register("airdropMaster")}
                placeholder="Enter master address"
                //error={errors.mint?.message}
                readAbout={{
                  title: "Airdrop Master Address",
                  description:
                    "Each Airdrop Requires an Airdrop Master program to be deployed. Enter the address of an existing master or create your own",
                }}
              />
            </div>
            <Button>Create Airdrop Master</Button>*/}
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
                  //error={errors.mint?.message}
                  readAbout={{
                    title: "Mint",
                    description: "The SPL token mint being airdropped",
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
                  //error={errors.delegateAuthority?.message}
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
                //error={errors.merkleRoot?.message}
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

              {/*<DropsyInput
              label="Version"
              icon={<Timer className="w-4 h-4" />}
              type="number"
              {...register("version")}
              placeholder="0"
            />

            <DropsyInput
              label="Mutable"
              icon={<Lock className="w-4 h-4" />}
              type="number"
              {...register("mutable")}
              placeholder="0 or 1"
              readAbout={{
                title: "Mutable",
                description:
                  "Whether the airdrop can be modified after creation (0=immutable, 1=mutable)",
              }}
            />*/}
            </div>

            {/*<DropsyInput
            label="Delegate Permissions"
            icon={<Users className="w-4 h-4" />}
            type="number"
            {...register("delegatePermissions")}
            placeholder="0"
            readAbout={{
              title: "Delegate Permissions",
              description:
                "Bitmask of permissions granted to delegate authority",
            }}
          />*/}
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
    </>
  );
};

export default AirdropForm;
