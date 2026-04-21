import * as z from "zod";
import { solanaAddressSchema } from "./airdrop-master";


export const airdropFormSchema = z.object({
  mint: solanaAddressSchema,
  merkleRoot: z
  .string()
  .regex(/^[0-9a-fA-F]{64}$/, "Merkle root must be 32-byte hex"),

  //merkleRoot: z.string().min(1, "Merkle root is required"),
  // optional fields
  startsAt: z.string().nullable().optional(),           // can be null or undefined
  endsAt: z.string().nullable().optional(),             // can be null or undefined
  delegateAuthority: z.string().nullable().optional(), 
});



/*export const airdropFormSchema = z.object({
  airdropMaster: solanaAddress,
  treasury: solanaAddress,
  mint: solanaAddress,

  merkleRoot: z
    .string()
    .regex(/^0x?[0-9a-fA-F]{64}$/, "Merkle root must be 32-byte hex"),
    merkleRoot: z.string().min(1, "Merkle root is required"),
    // optional fields
  startsAt: z.string().nullable().optional(),           // can be null or undefined
  endsAt: z.string().nullable().optional(),             // can be null or undefined
  version: z.string().optional(),                       // optional string
  mutable: z.string().optional(),                       // optional string

  delegateAuthority: z.string().min(1, "Delegate authority is required"),

  // defaulted field
  delegatePermissions: z.string().optional(),        // will always have "0" if not set
});*/

// TypeScript type
export type AirdropFormValues = z.infer<typeof airdropFormSchema>;
