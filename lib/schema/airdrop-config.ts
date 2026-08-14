import * as z from "zod";
import { solanaAddressSchema } from "./airdrop-master";


  const optionalFeeSchema = z
  .coerce
  .number()
  .min(0, "Fee must be greater or equal to 0")
  .optional();

export const airdropConfigUpdateSchema = z.object({
  wlRoot: z
    .string()
    .regex(/^[0-9a-fA-F]{64}$/, "Merkle root must be 32-byte hex"),
    airdropMasterCreateFee:optionalFeeSchema,
  protocolTreasury: solanaAddressSchema.optional(),
  maxClaimFee: optionalFeeSchema,
  maxActionFee: optionalFeeSchema,
  minAirdropDuration: optionalFeeSchema,
  defaultAirdropDuration: optionalFeeSchema,
  maxAirdropDuration:optionalFeeSchema,
  updateGracePeriod: optionalFeeSchema,
  protocolFee: optionalFeeSchema,
  masterFeeBps: optionalFeeSchema,
});

export type AirdropConfigUpdateValues = {
    //wlRoot: Option<bytes>;
    //airdropMasterCreateFee: Option<number /* u64 */>;
    //maxClaimFee: Option<number /* u64 */>;
    //maxActionFee: Option<number /* u64 */>;
    //minAirdropDuration: Option<number /* i64 */>;
    //defaultAirdropDuration: Option<number /* i64 */>;
    //maxAirdropDuration: Option<number /* i64 */>;
    //updateGracePeriod: Option<number /* i64 */>;
    //protocolFee: Option<number /* u64 */>;
    //masterFeeBps: Option<number /* u16 */>;
    //protocolTreasury: Option<Address>;
  wlRoot ?: string;
  airdropMasterCreateFee?:number;
  protocolTreasury?: string;
  maxClaimFee?: number;
  maxActionFee?: number;
  minAirdropDuration?: number;
  defaultAirdropDuration?: number;
  maxAirdropDuration?:number;
  updateGracePeriod?: number;
  protocolFee?: number;
  masterFeeBps?: number;
};

export type AirdropConfigUpdateFormValues = z.infer<typeof airdropConfigUpdateSchema>;
