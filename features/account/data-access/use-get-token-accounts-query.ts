import type { Address } from 'gill'
import { TOKEN_2022_PROGRAM_ADDRESS, TOKEN_PROGRAM_ADDRESS } from 'gill/programs/token'
import { useQuery } from '@tanstack/react-query'
import { useSolana } from '@/lib/context/solana-provider' 
import { getTokenAccountByMint, getTokenAccountsByOwner } from './get-token-accounts-by-owner'

export function useGetTokenAccountsQuery({ address }: { address: Address }) {
  const { walletUi, rpc } = useSolana()
  const {  cluster } = walletUi

  return useQuery({
    queryKey: ['get-token-accounts', { cluster, address }],
    queryFn: async () =>
      Promise.all([
        getTokenAccountsByOwner(rpc, { address, programId: TOKEN_PROGRAM_ADDRESS }),
        getTokenAccountsByOwner(rpc, { address, programId: TOKEN_2022_PROGRAM_ADDRESS }),
      ]).then(([tokenAccounts, token2022Accounts]) => [...tokenAccounts, ...token2022Accounts]),
  })
}

export function useGetTokenAccountQuery({ address }: { address: Address; }) {
  const { walletUi, rpc } = useSolana()
  const {  cluster } = walletUi
  

  return useQuery({
    queryKey: ['get-token-accounts', { cluster, address }],
    queryFn: async () =>
      Promise.all([
        getTokenAccountByMint(rpc, { address }),
        
      ]).then((tokenAccount) => tokenAccount),
  })
}