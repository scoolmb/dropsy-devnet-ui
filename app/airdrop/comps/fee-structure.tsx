// app/components/airdrop-master/fee-structure.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins, DollarSign } from "lucide-react";
/*
import FeeItem from "@/components/card/fee-item";

interface FeeStructureProps {
  fees: {
    airdropCreationFee: bigint;
    airdropUpdateFee: bigint;
    airdropClaimFee: bigint;
    airdropDelegateFee: bigint;
    bitmapCreationFee: bigint;
  };
}

export function FeeStructure({ fees }: FeeStructureProps) {
  const feeItems = [
    {
      label: "Airdrop Creation",
      valueInLamports: fees.airdropCreationFee,
      icon: <Coins className="h-4 w-4" />,
      description: "Fee to create a new airdrop",
    },
    {
      label: "Airdrop Update",
      valueInLamports: fees.airdropUpdateFee,
      icon: <DollarSign className="h-4 w-4" />,
      description: "Fee to update airdrop parameters",
    },
    {
      label: "Airdrop Claim",
      valueInLamports: fees.airdropClaimFee,
      icon: <Coins className="h-4 w-4" />,
      description: "Fee per claim transaction",
    },
    {
      label: "Airdrop Delegate",
      valueInLamports: fees.airdropDelegateFee,
      icon: <DollarSign className="h-4 w-4" />,
      description: "Fee to delegate authority",
    },
    {
      label: "Bitmap Creation",
      valueInLamports: fees.bitmapCreationFee,
      icon: <Coins className="h-4 w-4" />,
      description: "Fee to create bitmap",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Fee Structure
        </CardTitle>
        <CardDescription>
          Transaction fees managed by this airdrop master
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feeItems.map((fee, index) => (
            <FeeItem item={fee} key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
*/
