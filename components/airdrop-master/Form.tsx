import React from "react";
import { Card } from "@/components/ui/card";
//import { Separator } from "@/components/ui/separator";
import { UiWalletAccount } from "@wallet-standard/react";
import { useAirdropMasterForm } from "./useAirdropMasterForm";
import { AirdropMasterHeader } from "./Header";
import { DeployAirdropMasterCTA } from "./deploy-cta";
import { AirdropMasterConfig } from "./Basic-Setting";

const AirdropMasterForm = ({ account }: { account: UiWalletAccount }) => {
  const { form, onSubmit } = useAirdropMasterForm(account);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="bg-linear-to-br p-5 from-white-500/50 to-white dark:from-black/50 dark:to-black backdrop-blur-sm min-h-92">
        <AirdropMasterHeader />

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
