import { createSolanaRpc, type Address } from 'gill'
import { useQuery } from '@tanstack/react-query'
import { useGetBalanceQueryKey } from './use-get-balance-query-key'
import { useSolana } from '@/components/context/solana-provider'

export function useGetBalanceQuery({ address }: { address: Address }) {

  const RPC_ENDPOINT = "https://api.devnet.solana.com"
  const rpc = createSolanaRpc(RPC_ENDPOINT);

  return useQuery({
    retry: false,
    queryKey: useGetBalanceQueryKey({ address }),
    queryFn: () => rpc.getBalance(address).send(),
  })
}
