import { useSolana } from "@/lib/context/solana-provider";
import { useTransactionBuilder } from "@/features/solana/use-build-sign-transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWalletAccountTransactionSendingSigner } from "@solana/react";
import { UiWalletAccount } from "@wallet-standard/react";
import { address, ReadonlyUint8Array } from "gill";
import { useForm } from "react-hook-form";
import { airdropFormSchema, AirdropFormValues } from "../../lib/schema/airdrop";
import { useCreateAirdrop } from "@/features/airdrop/use-create-airdrop";
import { DROPSY_TREASURY_ADDRESS } from "@/lib/constant";
import { toast } from "sonner";

export function useAirdropForm(account: UiWalletAccount) {
    const { chain } = useSolana();
    const signer = useWalletAccountTransactionSendingSigner(account, chain);
    const { mutateAsync: createAirdrop } = useCreateAirdrop();
    const { mutateAsync: sendTx } = useTransactionBuilder();

    const AIRDROP_MASTER = process.env.NEXT_PUBLIC_AIRDROP_MASTER;
    const AIRDROP_MASTER_TREASURY = process.env.NEXT_PUBLIC_AIRDROP_MASTER_TREASURY;
    const AIRDROP_MASTER_CREATOR = process.env.NEXT_PUBLIC_AIRDROP_MASTER_CREATOR;
    
    const form = useForm<AirdropFormValues>({
        resolver: zodResolver(airdropFormSchema),
        mode: "onChange",
        defaultValues: {
          mint: "",
          merkleRoot: "",
          startsAt: null,
          endsAt: null,
          delegateAuthority: "",
        },
    });

    const onSubmit = async (data: AirdropFormValues) => {
      if(!AIRDROP_MASTER  || !AIRDROP_MASTER_CREATOR || !AIRDROP_MASTER_TREASURY) {
        toast.error("Airdrop Master Not Found")
      return;     
    }

        const merkleRootBytes = Uint8Array.from(
        data.merkleRoot
          .replace(/^0x/, "")
          .match(/.{1,2}/g)!
          .map((byte) => parseInt(byte, 16)),
      ) as ReadonlyUint8Array;


      const instructions = await createAirdrop({
        airdropMaster: address(AIRDROP_MASTER),
        masterCreator: address(AIRDROP_MASTER_CREATOR),
        treasury: address(AIRDROP_MASTER_TREASURY),
        protocolTreasury: DROPSY_TREASURY_ADDRESS,
        mint: address(data.mint),
        merkleRoot: merkleRootBytes,
        startsAt: data.startsAt
  ? BigInt(new Date(data.startsAt).getTime() / 1000) // milliseconds since epoch
  : null,
endsAt: data.endsAt
  ? BigInt(new Date(data.endsAt).getTime() / 1000)
  : null,

        version: null, // Number(data.version),
        mutable: null, //Number(data.mutable),
        delegateAuthority: null, // address(data.delegateAuthority),
        delegatePermissions: null, // Number(data.delegatePermissions),
        authority: signer,
      });

        return sendTx({ instructions, signer });
    };

    return { form, onSubmit };
}
