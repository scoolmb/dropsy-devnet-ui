import { useSolana } from '@/components/context/solana-provider'
import type { Address } from 'gill'


export function useGetBalanceQueryKey({ address }: { address: Address }) {
  const { chain } = useSolana()

  return ['get-balance', { chain, address }]
}
