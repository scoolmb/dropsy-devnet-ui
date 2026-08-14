import { useMutation } from "@tanstack/react-query";
import { Instruction } from "@solana/kit";
import {
  getInitializeAirdropConfigInstructionAsync,
  InitializeAirdropConfigAsyncInput,
} from "@/lib/dropsy";

export function useCreateAirdropConfig() {
  return useMutation<Instruction[], Error, InitializeAirdropConfigAsyncInput>({
    mutationFn: async (input: InitializeAirdropConfigAsyncInput) => {
      const createAirdropIx =
        await getInitializeAirdropConfigInstructionAsync(input);
      const instructions = [createAirdropIx];

      return instructions;
    },
  });
}
