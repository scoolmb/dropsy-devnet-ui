import { useMutation } from "@tanstack/react-query";
import { Instruction } from "@solana/kit";
import {
  CreateBitmapAsyncInput,
  getCreateBitmapInstructionAsync,
} from "@dropsy/airdrop";

export function useCreateClaimMap() {
  return useMutation<Instruction[], Error, CreateBitmapAsyncInput>({
    mutationFn: async (input: CreateBitmapAsyncInput) => {
      const createAirdropIx = await getCreateBitmapInstructionAsync(input);
      return [createAirdropIx];
    },
  });
}
