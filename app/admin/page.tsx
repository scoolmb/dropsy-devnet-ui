"use client";

import AirdropConfigUpdateForm from "@/components/airdrop-config/Form";
import { AuthWalletGate } from "@/components/auth-gate";
import { useSolana } from "@/lib/context/solana-provider";
import { AirdropConfig, fetchAirdropConfig } from "@/lib/dropsy";
import { IAirdropConfig, toUiAirdropConfig } from "@/lib/types/airdrop-config";
import { Account, address } from "@solana/kit";
import assert from "assert";
import React, { useEffect, useState } from "react";

const CONFIG_ADDRESS = address("UuJpjJFpX4brC92wXnZgKUzEnKq6w9D3MVWLdZZKFDp");

const AdminPage = () => {
  const { rpc } = useSolana();

  const [config, setConfig] = useState<IAirdropConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchAirdropConfig(rpc, CONFIG_ADDRESS);

        const configAccount = toUiAirdropConfig(result.data, CONFIG_ADDRESS);

        setConfig(configAccount);
      } catch (err) {
        console.error("Failed to fetch airdrop config:", err);

        setError("Failed to load airdrop configuration.");
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, [rpc]);

  return (
    <div>
      <AuthWalletGate>
        {(account) => (
          <>
            <AirdropConfigUpdateForm account={account} />

            <div className="mt-8 rounded-lg border p-6">
              <h2 className="text-xl font-semibold">Airdrop Configuration</h2>

              {loading && (
                <p className="mt-4 text-muted-foreground">
                  Loading configuration...
                </p>
              )}

              {error && <p className="mt-4 text-red-500">{error}</p>}

              {config && (
                <>
                  <pre className="mt-4 overflow-auto rounded-md bg-muted p-4 text-sm">
                    {config.address}
                  </pre>
                  <span> {config.wlRoot} </span>
                </>
              )}
            </div>
          </>
        )}
      </AuthWalletGate>
    </div>
  );
};

export default AdminPage;
