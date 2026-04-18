import { isAddress } from "@solana/kit";
import * as z from "zod";

// This keeps treasury as string type, but validates it's a valid Solana address
const solanaAddressSchema = z
  .string()
  .refine((val) => isAddress(val), {
    message: "Invalid Solana address",
  })
  .transform((val) => val.toString()); // Ensure it remains a string

export const airdropMasterSchema = z.object({
    treasury: solanaAddressSchema, // This will be string type, not Address
    airdropCreateFee: z.number().nullable(),
    airdropUpdateFee: z.number().nullable(),
    bitmapCreateFee: z.number().nullable(),
    claimFee: z.number().nullable(),
    delegateFee: z.number().nullable(),
});

export type AirdropMasterFormValues = z.infer<typeof airdropMasterSchema>;
