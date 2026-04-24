"use client";
import React from "react";
import AirdropForm from "@/components/airdrop/form";
import { AuthWalletGate } from "@/components/auth-gate";

const Page = () => {
  return (
    <div className="p-6">
      {/*master && (
        <AirdropMasterOverview
          id={master}
          setAirdropMaster={setAirdropMaster}
        />
      )*/}
      <AuthWalletGate>
        {(account) => <AirdropForm account={account} />}
      </AuthWalletGate>
    </div>
  );
};

export default Page;
