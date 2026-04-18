import { useMutation } from "@tanstack/react-query";
import { Instruction } from "@solana/kit";
import { useSolana } from "@/lib/context/solana-provider";
import {
  getInitializeAirdropMasterInstructionAsync,
  InitializeAirdropMasterAsyncInput,
} from "@dropsy/airdrop";

export function useCreateAirdropMaster() {
  const { rpc } = useSolana();
  return useMutation<Instruction[], Error, InitializeAirdropMasterAsyncInput>({
    mutationFn: async (input: InitializeAirdropMasterAsyncInput) => {
      const createAirdropIx =
        await getInitializeAirdropMasterInstructionAsync(input);
      const instructions = [createAirdropIx];

      return instructions;
    },
  });
}
