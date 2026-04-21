import { isAddress } from "@solana/kit";
import * as z from "zod";

export const solanaAddressSchema = z
  .string()
  .refine((val) => isAddress(val), {
    message: "Invalid Solana address",
  })
  .transform((val) => val.toString()); 

export const airdropMasterSchema = z.object({
    treasury: solanaAddressSchema, 
    airdropCreateFee: z.number().nullable(),
    airdropUpdateFee: z.number().nullable(),
    bitmapCreateFee: z.number().nullable(),
    claimFee: z.number().nullable(),
    delegateFee: z.number().nullable(),
});

export type AirdropMasterFormValues = z.infer<typeof airdropMasterSchema>;
