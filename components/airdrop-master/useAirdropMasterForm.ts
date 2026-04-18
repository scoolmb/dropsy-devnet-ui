import { useSolana } from "@/lib/context/solana-provider"; 
import { useCreateAirdropMaster } from "@/features/airdrop-master/use-create-airdrop-master";
import { useTransactionBuilder } from "@/features/solana/use-build-sign-transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWalletAccountTransactionSendingSigner } from "@solana/react";
import { UiWalletAccount } from "@wallet-standard/react";
import { address } from "gill";
import { useForm } from "react-hook-form";
import { AirdropMasterFormValues, airdropMasterSchema } from "./schema";
import { fromUiAmount } from "@/lib/utils";
//import { useCreateAirdropConfig } from "@/features/master/use-create-airdrop-master";

export function useAirdropMasterForm(account: UiWalletAccount,   discountData: any) {
    const { chain } = useSolana();
    const signer = useWalletAccountTransactionSendingSigner(account, chain);
    const { mutateAsync: createAirdropMaster } = useCreateAirdropMaster();
    //const { mutateAsync: createAirdropConfig } = useCreateAirdropConfig();
    const { mutateAsync: sendTx } = useTransactionBuilder();
  // Convert proof from hex to Uint8Array for Ancho

    const form = useForm<AirdropMasterFormValues>({
        resolver: zodResolver(airdropMasterSchema),
        defaultValues: {
            //merkleRoot: null,
            airdropCreateFee: null,
            airdropUpdateFee: null,
            bitmapCreateFee: null,
            advancedConfig: {
                claimFee: null,
                delegateFee: null,
            },
        },
    });

    const onSubmit = async (data: AirdropMasterFormValues) => {
        /*const merkleRootBytes = data.merkleRoot ? Uint8Array.from(
            data.merkleRoot.replace(/^0x/, "").match(/.{1,2}/g)!
                .map((b) => parseInt(b, 16))
        ) as ReadonlyUint8Array : null;*/
         //const discountProof = getDiscountProof(discountData, "124LgCamqi2e4UkZVV8zX29fZP8h67EV49Yw4RycRsdf");

        const instructions = await createAirdropMaster({
            treasury: address("AxDNTbaSB1VQMszvnNwbqMmxM1xq8mMQLr7MDxoLKVAk"),
            protocolTreasury: address("6TMmpVof9fGXak2VUgP4X9sXNfPHA7XWyi9ZMUCrHP6A"),
            affiliate: address("2aMTTZNJAKV8PiCqPKxpUbD9mcUsKSNbGQMCxGTdDifw"),
            creator: signer,
            discountProof: null,
            airdropCreationFee: fromUiAmount(data.airdropCreateFee || 0),
            airdropUpdateFee: fromUiAmount(data.airdropUpdateFee || 0),
            bitmapCreationFee: fromUiAmount(data.bitmapCreateFee || 0),
            airdropClaimFee: fromUiAmount(data.advancedConfig.claimFee || 0),
            airdropDelegateFee:fromUiAmount(data.advancedConfig.delegateFee || 0),

        });
        /*const instructions = await createAirdropConfig({
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
            protocolTreasury:  address("6TMmpVof9fGXak2VUgP4X9sXNfPHA7XWyi9ZMUCrHP6A"),
        });*/

        return sendTx({ instructions, signer });
    };

    return { form, onSubmit };
}
