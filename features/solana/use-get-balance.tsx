import { DappApi } from "@/lib/api/Dapp";
import { useQuery } from "@tanstack/react-query";

export function useGetTreasuryBalance() {
  return useQuery<{ balance: string; solPrice: number | null }>({
    queryKey: ["treasury-balance"],
    queryFn: () => DappApi.getTreasuryBalance(),
    staleTime: 60_000,
  });
}
