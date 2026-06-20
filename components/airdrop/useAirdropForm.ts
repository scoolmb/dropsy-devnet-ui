import { useSolana } from "@/lib/context/solana-provider";
import { useTransactionBuilder } from "@/features/solana/use-build-sign-transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWalletAccountTransactionSendingSigner } from "@solana/react";
import { UiWalletAccount } from "@wallet-standard/react";
import { address, ReadonlyUint8Array } from "gill";
import { useForm } from "react-hook-form";
import { airdropFormSchema, AirdropFormValues } from "../../lib/schema/airdrop";
import { useCreateAirdrop } from "@/features/airdrop/use-create-airdrop";
import { DROPSY_TREASURY_ADDRESS } from "@/lib/constants";
import { toast } from "sonner";
import { CreateBitmapAsyncInput, DepositTokensAsyncInput, fetchAirdropMaster, getCreateBitmapInstructionAsync, getDepositTokensInstructionAsync } from "@dropsy/airdrop";
import {
  findAssociatedTokenPda,
  TOKEN_PROGRAM_ADDRESS,
} from "@solana-program/token";
import { fetchMint } from "gill/programs";
import { fromUiAmount } from "@/lib/utils";
import { getAirdropDerivedAddress } from "@/lib/derive";
export function useAirdropForm(account: UiWalletAccount, airdropId: number) {
    const { chain, rpc } = useSolana();
    const signer = useWalletAccountTransactionSendingSigner(account, chain);
    const { mutateAsync: createAirdrop } = useCreateAirdrop();
    const { mutateAsync: sendTx } = useTransactionBuilder();

    const AIRDROP_MASTER = process.env.NEXT_PUBLIC_AIRDROP_MASTER;

  
    
    const form = useForm<AirdropFormValues>({
        resolver: zodResolver(airdropFormSchema),
        mode: "onChange",
        defaultValues: {
          mint: "",
          amount: "", 
          merkleRoot: "",
          startsAt: null,
          endsAt: null,
          delegateAuthority: "",
        },
    });

    const onSubmit = async (data: AirdropFormValues) => {
      if(!AIRDROP_MASTER ) {
        toast.error("Airdrop Master Not Found, please set airdrop master address, treasury and creator in the .env file");
      return;     
    }
    const airdropMasterAcc = await fetchAirdropMaster(rpc, address(AIRDROP_MASTER));
      const mintAccount = await fetchMint(rpc, address(data.mint));
      console.log(mintAccount);

      const amountIn = fromUiAmount(data.amount, mintAccount.data.decimals);
       console.log(amountIn);
        const merkleRootBytes = Uint8Array.from(
        data.merkleRoot
          .replace(/^0x/, "")
          .match(/.{1,2}/g)!
          .map((byte) => parseInt(byte, 16)),
      ) as ReadonlyUint8Array;

      const [airdrop, airdropBump] = await getAirdropDerivedAddress(
    signer.address,
    address(data.mint),
    airdropId,
  );

      const instructions = await createAirdrop({
        airdropMaster: address(AIRDROP_MASTER),
        masterCreator: airdropMasterAcc.data.creator,
        treasury: airdropMasterAcc.data.treasury,
        protocolTreasury: DROPSY_TREASURY_ADDRESS,
        mint: address(data.mint),
        merkleRoot: merkleRootBytes,
        airdrop,
        startsAt: data.startsAt
  ? BigInt(new Date(data.startsAt).getTime() / 1000) // milliseconds since epoch
  : null,
endsAt: data.endsAt
  ? BigInt(new Date(data.endsAt).getTime() / 1000)
  : null,

        version: null, // Number(data.version),
        id: BigInt(airdropId), // You can generate a unique ID for each airdrop, e.g., using a timestamp or a UUID
        delegateAuthority: null, // address(data.delegateAuthority),
        authority: signer,
      });


      const claimMapdata: CreateBitmapAsyncInput = {
        airdropId,
      mint: address(data.mint),
      treasury: airdropMasterAcc.data.treasury,
      protocolTreasury: DROPSY_TREASURY_ADDRESS,
      masterCreator: airdropMasterAcc.data.creator,
      id: 0,
      total: 5000,
      authority: signer,
    };
    const [sourceTokenAccount, _sourceATABump] = await findAssociatedTokenPda({
      owner: signer.address,
      mint: address(data.mint),
      tokenProgram: TOKEN_PROGRAM_ADDRESS,
    });
    const depositData: DepositTokensAsyncInput = {
      airdropId,
      mint: address(data.mint),
      sourceTokenAccount,
      amount: data.amount ? BigInt(amountIn) : 0,
      authority: signer,
    };
    const createBitmapIx = await getCreateBitmapInstructionAsync(claimMapdata);

    const createDepositIx = await getDepositTokensInstructionAsync(depositData);
    
    instructions.push( createDepositIx, createBitmapIx);

        return sendTx({ instructions, signer });
    };

    return { form, onSubmit };
}
