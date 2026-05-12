import { fetchMint } from '@solana-program/token';
import { createSolanaRpc } from '@solana/kit';
import type { Address } from 'gill'

export async function getTokenAccountsByOwner(
  rpc: ReturnType<typeof createSolanaRpc>,
  { address, programId }: { address: Address; programId: Address },
) {
  return await rpc
    .getTokenAccountsByOwner(address, { programId }, { commitment: 'confirmed', encoding: 'jsonParsed' })
    .send()
    .then((res) => res.value ?? [])
}

export async function getTokenAccountByMint(
  rpc: ReturnType<typeof createSolanaRpc>,
  { address }: { address: Address; },
) {
  return await fetchMint(rpc, address);
}