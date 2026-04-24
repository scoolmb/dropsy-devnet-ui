import { useSolana } from "@/lib/context/solana-provider"; 
import { useTransactionBuilder } from "@/features/solana/use-build-sign-transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWalletAccountTransactionSendingSigner } from "@solana/react";
import { UiWalletAccount } from "@wallet-standard/react";
import { address, ReadonlyUint8Array } from "gill";
import { useForm } from "react-hook-form";
import { useCreateAirdrop } from "@/features/airdrop/use-create-airdrop"; 
import { ClaimMapFormValue, claimMapFormSchema } from "./schema";

export function useClaimMapForm(account: UiWalletAccount) {
    const { chain } = useSolana();
    const signer = useWalletAccountTransactionSendingSigner(account, chain);
    const { mutateAsync: createAirdrop } = useCreateAirdrop();
    const { mutateAsync: sendTx } = useTransactionBuilder();
    
    const form = useForm<ClaimMapFormValue>({
        resolver: zodResolver(claimMapFormSchema),
        defaultValues: {
          airdropMaster: "",
          treasury: "",
          mint: "",
          merkleRoot: "",
          startsAt: null,
          endsAt: null,
          delegateAuthority: "",
        },
    });

    const onSubmit = async (data: ClaimMapFormValue) => {

        const merkleRootBytes = Uint8Array.from(
        data.merkleRoot
          .replace(/^0x/, "")
          .match(/.{1,2}/g)!
          .map((byte) => parseInt(byte, 16)),
      ) as ReadonlyUint8Array;

      const instructions = await createAirdrop({
        //airdropMaster: address(data.),
        masterCreator: address("7B958HYBCDM8xCGzUu3nXXV4D7iQeQNUXnhBYwuPeFZs"),
        treasury: address("AxDNTbaSB1VQMszvnNwbqMmxM1xq8mMQLr7MDxoLKVAk"),
        protocolTreasury: address("6TMmpVof9fGXak2VUgP4X9sXNfPHA7XWyi9ZMUCrHP6A"),
        mint: address(data.mint),
        merkleRoot: merkleRootBytes,
        startsAt: data.startsAt
  ? BigInt(new Date(data.startsAt).getTime() / 1000) // milliseconds since epoch
  : null,
endsAt: data.endsAt
  ? BigInt(new Date(data.endsAt).getTime() / 1000)
  : null,

        version: Number(data.version),
        mutable: Number(data.mutable),
        delegateAuthority: address(data.delegateAuthority),
        delegatePermissions: Number(data.delegatePermissions),
        authority: signer,
      });

        return sendTx({ instructions, signer });
    };

    return { form, onSubmit };
}
