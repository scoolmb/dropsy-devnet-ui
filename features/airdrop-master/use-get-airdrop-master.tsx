import { useQuery } from "@tanstack/react-query";
import {
  Account,
  Address,
  assertAccountExists,
  createSolanaRpc,
} from "@solana/kit";
import { AirdropMaster, fetchMaybeAirdropMaster } from "@dropsy/airdrop";

export function useFetchAirdropMaster(
  rpc: ReturnType<typeof createSolanaRpc>,
  address: Address | null,
) {
  const enabled = Boolean(rpc && address);

  return useQuery<Account<AirdropMaster, string>>({
    queryKey: ["airdrop-master", address?.toString()],
    enabled,

    queryFn: async () => {
      if (!rpc) {
        throw new Error("RPC is not available");
      }

      if (!address) {
        throw new Error("Airdrop address is missing");
      }

      const account = await fetchMaybeAirdropMaster(rpc, address);

      assertAccountExists(account);

      return account;
    },
  });
}
