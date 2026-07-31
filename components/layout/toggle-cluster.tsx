"use client";

import { useSolana } from "@/lib/context/solana-provider";

export function RpcToggle() {
  const { cluster, setCluster } = useSolana();

  return (
    <div className="flex rounded-lg border overflow-hidden">
      <button
        onClick={() => setCluster("devnet")}
        className={`px-4 py-2 ${
          cluster === "devnet" ? "bg-yellow-500 text-black" : "bg-transparent"
        }`}
      >
        Devnet
      </button>

      <button
        onClick={() => setCluster("mainnet")}
        className={`px-4 py-2 ${
          cluster === "mainnet" ? "bg-yellow-500 text-black" : "bg-transparent"
        }`}
      >
        Mainnet
      </button>
    </div>
  );
}
