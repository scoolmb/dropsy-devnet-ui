import { useCreateClaimMap } from "@/features/claimMap/use-create-claimMap";
import { useWalletAccountTransactionSendingSigner } from "@solana/react";
import { UiWalletAccount } from "@wallet-standard/react";
import React from "react";
import { useSolana } from "@/lib/context/solana-provider";
import { CreateBitmapAsyncInput } from "@dropsy/airdrop";
import { address } from "gill";
import { Button } from "../ui/button";
import { useTransactionBuilder } from "@/features/solana/use-build-sign-transaction";
//import { useDepositAirdropTokens } from "@/features/airdrop/use-deposit-airdrop-tokens";
import { toast } from "sonner";
import { DROPSY_TREASURY_ADDRESS } from "@/lib/constants";
import { getAirdropDerivedAddress } from "@/lib/derive";

const ClaimMapForm = ({
  account,
  data,
}: {
  account: UiWalletAccount;
  data: CreateBitmapAsyncInput;
}) => {
  const { mutateAsync: createClaimMap } = useCreateClaimMap();
  //const { mutateAsync: depositTokens } = useDepositAirdropTokens();
  const { chain } = useSolana();
  const { mutateAsync: sendTx } = useTransactionBuilder();
  const signer = useWalletAccountTransactionSendingSigner(account, chain);
  const airdropAddress = address(
    "58sbZfJGKUN7sMR6dkt4SwjMYE8yvsjwvykspKFeGrU4",
  );

  const AIRDROP_MASTER = process.env.NEXT_PUBLIC_AIRDROP_MASTER;
  const AIRDROP_MASTER_TREASURY =
    process.env.NEXT_PUBLIC_AIRDROP_MASTER_TREASURY;
  const AIRDROP_MASTER_CREATOR = process.env.NEXT_PUBLIC_AIRDROP_MASTER_CREATOR;
  const MINT_ADDRESS = process.env.NEXT_PUBLIC_MINT_ADDRESS;
  const AIRDROP_ADDRESS = process.env.NEXT_PUBLIC_AIRDROP_ADDRESS;

  const onSubmit = async () => {
    if (
      !AIRDROP_MASTER ||
      !AIRDROP_MASTER_CREATOR ||
      !MINT_ADDRESS ||
      !AIRDROP_ADDRESS ||
      !AIRDROP_MASTER_TREASURY
    ) {
      toast.error("Airdrop Master Not Found");
      return;
    }

    const instructions = await createClaimMap(data);

    await sendTx({ instructions, signer });
  };

  const onDeposit = async () => {
    /* if (!MINT_ADDRESS || !AIRDROP_ADDRESS) return;
    const mint = address(MINT_ADDRESS);
    const [vault, vaultBump] = await findAssociatedTokenPda({
      owner: airdropAddress,
      mint: mint,
      tokenProgram: TOKEN_PROGRAM_ADDRESS,
    });
    const [sourceTokenAccount, sourceATABump] = await findAssociatedTokenPda({
      owner: signer.address,
      mint: mint,
      tokenProgram: TOKEN_PROGRAM_ADDRESS,
    });
    const data: DepositTokensAsyncInput = {
      mint,
      airdrop: address(AIRDROP_ADDRESS),
      sourceTokenAccount,
      amount: 500000000000,
      authority: signer,
    };

    const instructions = await depositTokens(data);

    await sendTx({ instructions, signer });*/
  };
  return (
    <div className="p-20">
      <Button onClick={onSubmit}>claim-map</Button>
      <Button onClick={onDeposit}>deposit tokens</Button>
    </div>
  );
};

export default ClaimMapForm;
