"use client";
import React, { useEffect } from "react";
import AirdropForm from "@/components/airdrop/form";
import { AuthWalletGate } from "@/components/auth-gate";

const Page = () => {
  // initialize with a stable unique id to avoid calling setState inside useEffect
  const [airdropId, setAirdropId] = React.useState<number>(() => Date.now());

  return (
    <div className="p-6">
      {/*master && (
        <AirdropMasterOverview
          id={master}
          setAirdropMaster={setAirdropMaster}
        />
      )*/}

      <AuthWalletGate>
        {(account) => <AirdropForm account={account} airdropId={airdropId} />}
      </AuthWalletGate>
    </div>
  );
};

export default Page;
