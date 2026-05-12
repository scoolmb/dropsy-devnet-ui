import type { Address } from 'gill'
import { useSolana } from '@/lib/context/solana-provider'

export function useGetSignaturesQueryKey({ address }: { address: Address }) {
  const { walletUi } = useSolana()
  const cluster = walletUi.cluster
  return ['get-signatures', { cluster, address }]
}
