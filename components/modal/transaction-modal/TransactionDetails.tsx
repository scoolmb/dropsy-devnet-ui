import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TransactionDetails } from "./types";
import { formatAddress, handleCopy } from "@/lib/utils";
import { Clipboard, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddressItemDisplay from "@/components/address-display";

interface TransactionDetailsCardProps {
  details: TransactionDetails;
}
export const TransactionDetailsCard: React.FC<TransactionDetailsCardProps> = ({
  details,
}) => {
  const detailItems = [
    { label: "Network", value: details.network, isHighlight: false },
    { label: "Action", value: details.action, isHighlight: false },
    { label: "From", value: details.from, isHighlight: true },
  ];

  return (
    <Card className="mb-2">
      <CardContent className="pt-2">
        <h3 className="text-sm font-semibold mb-2">Transaction Details</h3>
        <div className="space-y-2">
          {detailItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
                <span
                  className={`text-xs font-mono ${item.isHighlight ? "font-semibold" : ""}`}
                >
                  {item.value}
                </span>
              </div>
              {index < detailItems.length - 1 && <Separator className="my-2" />}
            </React.Fragment>
          ))}

          {details.createdPdas && details.createdPdas.length > 0 && (
            <>
              <Separator className="my-2" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs font-medium">Created PDAs</span>
                </div>
                <div className="space-y-1.5 pl-2">
                  {/*details.createdPdas.map((pda, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-xs text-muted-foreground">
                        {pda.type}
                      </span>
                      <span className="text-xs font-mono">
                        {formatAddress(pda.address)}
                      </span>
                      <Button onClick={() => handleCopy(pda.address)}>
                        <Clipboard className="w-2 h-2 text-gray-500" />
                      </Button>
                    </div>
                    <AddressItemDisplay value={pda.address} />
                  ))*/}
                  {details.createdPdas.map((pda, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-xs text-muted-foreground">
                        {pda.type}
                      </span>
                      <AddressItemDisplay
                        key={pda.address}
                        value={pda.address}
                        truncated
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
