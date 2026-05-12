import type { Address } from 'gill'
import { useSolana } from '@/lib/context/solana-provider' 

export function useGetBalanceQueryKey({ address }: { address: Address }) {
  const { rpc } = useSolana()

  return ['get-balance', { rpc, address }]
}
