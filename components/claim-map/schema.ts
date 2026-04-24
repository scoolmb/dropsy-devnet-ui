import * as z from "zod";

/* 
      mint: address("9L9BV9wsypfpCA6mREVFbbg555vzPcsuyG3FTEaEMk9h"),
      treasury: address("AxDNTbaSB1VQMszvnNwbqMmxM1xq8mMQLr7MDxoLKVAk"),
      protocolTreasury: address("6TMmpVof9fGXak2VUgP4X9sXNfPHA7XWyi9ZMUCrHP6A"),
      masterCreator: address("6C3794oBuEoaML2YszM39H9TwQPK836hdmj6R8WEk8jW"),
      airdrop: airdropAddress,
      id: 0,
      total: 5000,
      authority: signer, 
      */
export const claimMapFormSchema = z.object({
  treasury: z.string().min(1, "Treasury address is required"),
  mint: z.string().min(1, "Mint address is required"),
  airdrop: z.string().min(1, "Airdrop Address is required"),

  // optional fields
  startsAt: z.string().nullable().optional(),           // can be null or undefined
  endsAt: z.string().nullable().optional(),             // can be null or undefined
  version: z.string().optional(),                       // optional string
  mutable: z.string().optional(),                       // optional string

  delegateAuthority: z.string().min(1, "Delegate authority is required"),

  // defaulted field
  delegatePermissions: z.string().optional(),        // will always have "0" if not set
});

// TypeScript type
export type ClaimMapFormValue = z.infer<typeof claimMapFormSchema>;
