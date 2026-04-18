import { isAddress } from "@solana/kit";
import * as z from "zod";
const solanaAddressSchema = z
  .string()
  .refine((val) => isAddress(val), {
    message: "Invalid Solana address",
  });

export const airdropMasterSchema = z.object({
    treasury: solanaAddressSchema,
    airdropCreateFee: z.string().nullable(),
    airdropUpdateFee: z.string().nullable(),
    bitmapCreateFee: z.string().nullable(),
    advancedConfig: z.object({
        claimFee: z.string().nullable(),
        delegateFee: z.string().nullable(),
    }),
});

export type AirdropMasterFormValues =
    z.infer<typeof airdropMasterSchema>;
