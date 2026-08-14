import { useQuery } from "@tanstack/react-query";

interface ClaimEntry {
  address: string;
  proof: string[];
}

async function checkEligibility(address: string): Promise<ClaimEntry | null> {
  const res = await fetch("/wl-proof.json");
  const data = await res.json();

  const found = data.proofs.find(
    (entry: ClaimEntry) => entry.address === address,
  );

  return found ?? null;
}

export function useCheckEligibility(address?: string) {
  return useQuery({
    queryKey: ["wl-access", address],
    queryFn: () => checkEligibility(address!),
    enabled: !!address,
  });
}
