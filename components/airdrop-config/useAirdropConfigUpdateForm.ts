import { useSolana } from "@/lib/context/solana-provider"; 
import { useTransactionBuilder } from "@/features/solana/use-build-sign-transaction";
import { useWalletAccountTransactionSendingSigner } from "@solana/react";
import { UiWalletAccount } from "@wallet-standard/react";
import { address } from "gill";
import { SubmitHandler, useForm } from "react-hook-form";
import { AirdropMasterFormValues } from "@/lib/schema/airdrop-master";
import { fromUiAmount } from "@/lib/utils";
import { getUpdateAirdropConfigInstructionAsync } from "@/lib/dropsy";
import { AirdropConfigUpdateFormValues } from "@/lib/schema/airdrop-config";
import { ReadonlyUint8Array } from "@solana/kit";

export function useAirdropConfigUpdateForm(account: UiWalletAccount) {
    const { chain } = useSolana();
    const signer = useWalletAccountTransactionSendingSigner(account, chain);

    const { mutateAsync: sendTx } = useTransactionBuilder();

    

    const form = useForm<AirdropConfigUpdateFormValues>({
        //resolver: zodResolver(airdropMasterSchema),
        defaultValues: {
            wlRoot: "",
        },
    });
const onSubmit: SubmitHandler<AirdropConfigUpdateFormValues> = async (data) => {

    const merkleRootBytes = Uint8Array.from(
            data.wlRoot
              .replace(/^0x/, "")
              .match(/.{1,2}/g)!
              .map((byte) => parseInt(byte, 16)),
          ) as ReadonlyUint8Array;

        const ix = await getUpdateAirdropConfigInstructionAsync({
            args: {
                 wlRoot:merkleRootBytes,
                airdropMasterCreateFee: null,
            minAirdropDuration: null,
            maxAirdropDuration:null,
            defaultAirdropDuration: null,
            updateGracePeriod:null,
            protocolFee:null,
            masterFeeBps:null,
            maxActionFee:null,
            maxClaimFee: null,
            protocolTreasury:null,
            //protocolTreasury:  address("6TMmpVof9fGXak2VUgP4X9sXNfPHA7XWyi9ZMUCrHP6A"),

            },
            authority:signer
        });

    await sendTx({ instructions: [ix], signer });
};


    return { form, onSubmit };
}
