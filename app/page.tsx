"use client";
import React from "react";
import { Rocket, Shield, Binary } from "lucide-react";
import LinkCard from "@/components/inner-link-card";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Dropsy Devnet</h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Build, test, and experiment with token distribution primitives on
            Solana Devnet. Make sure your wallet has Devnet SOL to interact with
            the our Program.
          </p>

          <div className="text-sm text-muted-foreground">
            No risk. No real funds. Just pure Testing.
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/*<LinkCard
            title="Create Airdrop"
            description="Distribute tokens to multiple addresses with flexible parameters and scheduling"
            icon={Rocket}
            variant="default"
            link="/airdrop/"
            tag="Standard"
            glow={true}
          />*/}

          <LinkCard
            link="/airdrop-master/"
            title="Airdrop Master"
            description="Full control layer with fees, delegation, and advanced configuration logic"
            icon={Shield}
            variant="default"
            tag="Advanced"
            glow={true}
          />

          {/*<LinkCard
            link="/merkle/"
            title="Merkle Tree Builder"
            description="Generate and manage merkle roots for scalable and verifiable claims"
            icon={Binary}
            variant="default"
            tag="Utility"
            glow={true}
          />*/}
        </div>

        {/* Bottom note */}
        <div className="text-center text-xs text-muted-foreground pt-4">
          Built for developers experimenting our token distribution primitives
          on Solana Devnet.
        </div>
      </div>
    </div>
  );
};

export default Page;
