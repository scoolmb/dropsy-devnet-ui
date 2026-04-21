import { useMutation } from "@tanstack/react-query";
import { Instruction } from "@solana/kit";
import {
  CreateAirdropAsyncInput,
  getCreateAirdropInstructionAsync,
} from "@dropsy/airdrop";

export function useCreateAirdrop() {
  return useMutation<Instruction[], Error, CreateAirdropAsyncInput>({
    mutationFn: async (input: CreateAirdropAsyncInput) => {
      const createAirdropIx = await getCreateAirdropInstructionAsync(input);
      const instructions = [createAirdropIx];
      return instructions;
    },
  });
}
