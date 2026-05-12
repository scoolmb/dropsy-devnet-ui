import type { Address } from 'gill'
import { useQuery } from '@tanstack/react-query'
import { useSolana } from '@/lib/context/solana-provider' 
import { useGetSignaturesQueryKey } from './use-get-signatures-query-key'

export function useGetSignaturesQuery({ address }: { address: Address }) {
  const { rpc } = useSolana()

  return useQuery({
    queryKey: useGetSignaturesQueryKey({ address }),
    queryFn: () => rpc.getSignaturesForAddress(address).send(),
  })
}
