"use client";

import { Button } from "@/components/ui/button";
import { formatAddress } from "@/lib/utils";
import { Copy, ExternalLink, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface AddressItemProps {
  value: string;
  truncated?: boolean;
  url?: string;
  copyFeedbackDuration?: number;
}

export function AddressItemDisplay({
  value,
  truncated,
  url,
  copyFeedbackDuration = 2000,
}: AddressItemProps) {
  const [copied, setCopied] = useState(false);
  const [copyInProgress, setCopyInProgress] = useState(false);

  const displayAddress = truncated ? `${formatAddress(value)}` : value;

  const handleCopy = async () => {
    if (copyInProgress) return;

    setCopyInProgress(true);

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } finally {
      setTimeout(() => {
        setCopied(false);
        setCopyInProgress(false);
      }, copyFeedbackDuration);
    }
  };

  return (
    <div className="flex items-center">
      <span className="font-mono text-xs break-all mr-1">{displayAddress}</span>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        disabled={copyInProgress}
        className="h-4 w-4"
        aria-label={copied ? "Copied" : "Copy address"}
        title={copied ? "Copied" : "Copy to clipboard"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

export default AddressItemDisplay;
