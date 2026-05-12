import type { Address } from 'gill'
import { useQuery } from '@tanstack/react-query'
import { useSolana } from '@/lib/context/solana-provider' 
import { useGetBalanceQueryKey } from './use-get-balance-query-key'

export function useGetBalanceQuery({ address }: { address: Address }) {
  const { rpc } = useSolana()

  return useQuery({
    retry: false,
    queryKey: useGetBalanceQueryKey({ address }),
    queryFn: async () => rpc.getBalance(address).send(),
    enabled: !!address, // only run if address exists
  })
}
