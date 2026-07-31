"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import {
  useWallets,
  type UiWallet,
  type UiWalletAccount,
} from "@wallet-standard/react";
import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";
import { StandardConnect } from "@wallet-standard/core";
import { useWalletUi, WalletUiContextValue } from "@wallet-ui/react";

type SolanaChain = "solana:devnet" | "solana:mainnet";

interface SolanaContextState {
  // RPC
  rpc: ReturnType<typeof createSolanaRpc>;
  ws: ReturnType<typeof createSolanaRpcSubscriptions>;

  cluster: SolanaCluster;
  setCluster: (cluster: SolanaCluster) => void;
  chain: SolanaChain;

  // Wallet State

  wallets: UiWallet[];
  selectedWallet: UiWallet | null;
  selectedAccount: UiWalletAccount | null;
  isConnected: boolean;

  // Wallet Actions
  walletUi: WalletUiContextValue;
  setWalletAndAccount: (
    wallet: UiWallet | null,
    account: UiWalletAccount | null,
  ) => void;
}

type SolanaCluster = "devnet" | "mainnet";

const RPC_ENDPOINTS = {
  devnet: {
    rpc: "https://api.devnet.solana.com",
    ws: "wss://api.devnet.solana.com",
    chain: "solana:devnet",
  },
  mainnet: {
    rpc:
      process.env.NEXT_PUBLIC_MAINNET_RPC ||
      "https://api.mainnet-beta.solana.com",
    ws: "wss://api.mainnet-beta.solana.com",
    chain: "solana:mainnet",
  },
} satisfies Record<
  SolanaCluster,
  { rpc: string; ws: string; chain: SolanaChain }
>;

const SolanaContext = createContext<SolanaContextState | undefined>(undefined);

export function useSolana() {
  const context = useContext(SolanaContext);
  if (!context) {
    throw new Error("useSolana must be used within a SolanaProvider");
  }
  return context;
}

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const allWallets = useWallets();
  const walletUi = useWalletUi();

  const [cluster, setCluster] = useState<SolanaCluster>("devnet");

  const rpc = useMemo(
    () => createSolanaRpc(RPC_ENDPOINTS[cluster].rpc),
    [cluster],
  );
  const ws = useMemo(
    () => createSolanaRpcSubscriptions(RPC_ENDPOINTS[cluster].ws),
    [cluster],
  );

  const chain = useMemo(() => RPC_ENDPOINTS[cluster].chain, [cluster]);

  // Filter for Solana wallets only that support signAndSendTransaction
  const wallets = useMemo(() => {
    return allWallets.filter(
      (wallet) =>
        wallet.chains?.some((c) => c.startsWith("solana:")) &&
        wallet.features.includes(StandardConnect) &&
        wallet.features.includes("solana:signAndSendTransaction"),
    );
  }, [allWallets]);

  // State management
  const [selectedWallet, setSelectedWallet] = useState<UiWallet | null>(null);
  const [selectedAccount, setSelectedAccount] =
    useState<UiWalletAccount | null>(null);

  // Check if connected (account must exist in the wallet's accounts)
  const isConnected = useMemo(() => {
    if (!selectedAccount || !selectedWallet) return false;

    // Find the wallet and check if it still has this account
    const currentWallet = wallets.find((w) => w.name === selectedWallet.name);
    return !!(
      currentWallet &&
      currentWallet.accounts.some(
        (acc) => acc.address === selectedAccount.address,
      )
    );
  }, [selectedAccount, selectedWallet, wallets]);

  const setWalletAndAccount = (
    wallet: UiWallet | null,
    account: UiWalletAccount | null,
  ) => {
    setSelectedWallet(wallet);
    setSelectedAccount(account);
  };

  // Create context value
  const contextValue = useMemo<SolanaContextState>(
    () => ({
      // Static RPC values
      rpc,
      ws,
      cluster,
      setCluster,
      chain,

      // Dynamic wallet values
      wallets,
      walletUi,
      selectedWallet,
      selectedAccount,
      isConnected,
      setWalletAndAccount,
    }),
    [
      wallets,
      selectedWallet,
      walletUi,
      selectedAccount,
      isConnected,
      cluster,
      rpc,
      ws,
      chain,
    ],
  );

  return (
    <SolanaContext.Provider value={contextValue}>
      {children}
    </SolanaContext.Provider>
  );
}
