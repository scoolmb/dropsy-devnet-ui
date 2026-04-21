"use client";

import AirdropForm from "@/components/airdrop/form";
import { AuthWalletGate } from "@/components/auth-gate";
import { useSearchParams } from "next/navigation";

import React, { useState } from "react";
import AirdropMasterOverview from "./comps/airdropMaster";
import { AirdropMaster } from "@dropsy/airdrop";

const Page = () => {
  const searchParams = useSearchParams();
  const master = searchParams.get("master");
  const [airdropMaster, setAirdropMaster] = useState<AirdropMaster | undefined>(
    undefined,
  );

  return (
    <div className="p-6">
      {/*master && (
        <AirdropMasterOverview
          id={master}
          setAirdropMaster={setAirdropMaster}
        />
      )*/}
      <AuthWalletGate>
        {(account) => (
          <AirdropForm account={account} airdropMaster={airdropMaster} />
        )}
      </AuthWalletGate>
    </div>
  );
};

export default Page;
