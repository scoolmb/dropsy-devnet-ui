import { useMutation } from "@tanstack/react-query";
import { Instruction } from "@solana/kit";
import {
  DepositTokensAsyncInput,
  getDepositTokensInstructionAsync,
} from "@/lib/dropsy";

export function useDepositAirdropTokens() {
  return useMutation<Instruction[], Error, DepositTokensAsyncInput>({
    mutationFn: async (input: DepositTokensAsyncInput) => {
      const createAirdropIx = await getDepositTokensInstructionAsync(input);
      const instructions = [createAirdropIx];
      return instructions;
    },
  });
}
