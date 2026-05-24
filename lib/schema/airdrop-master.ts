import { isAddress } from "@solana/kit";
import * as z from "zod";

export const solanaAddressSchema = z
  .string()
  .refine((val) => isAddress(val), {
    message: "Invalid Solana address",
  })
  .transform((val) => val.toString()); 

  const optionalDecimalSchema = z
  .string()
  .trim()
  .optional()
  .refine((val) => {
    if (val === undefined || val === "") return true;

    const num = Number(val);

    return (
      !isNaN(num) &&
      num >= 0 
    );
  }, {
    message: "Fee Amount must be a valid number ",
  });

  const optionalFeeSchema = z
  .coerce
  .number()
  .min(0, "Fee must be greater or equal to 0")
  .optional();

export const airdropMasterSchema = z.object({
    treasury: solanaAddressSchema.optional(), 
    airdropCreateFee :optionalFeeSchema,
    airdropUpdateFee: optionalFeeSchema,
    bitmapCreateFee: optionalFeeSchema,
    claimFee:  optionalFeeSchema,
    delegateFee: optionalFeeSchema,
});

export type AirdropMasterValues = {
  treasury?: string;
  airdropCreateFee?: number;
  airdropUpdateFee?: number;
  bitmapCreateFee?: number;
  claimFee?: number;
  delegateFee?: number;
};

export type AirdropMasterFormValues = z.infer<typeof airdropMasterSchema>;
