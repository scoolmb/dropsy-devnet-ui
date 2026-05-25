export interface TransactionDetails {
  network: string;
  action: string;
  from: string;
  toProgram?: string;
  requiredSol?: string;
  createdPdas?: PDA[]; 
}

export interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSign: () => void;
  transactionDetails: TransactionDetails;
  isLoading?: boolean;
}

export interface PDA {
  type: string;  // e.g., "Claim Map", "Airdrop", "Vault"
  address: string;
}