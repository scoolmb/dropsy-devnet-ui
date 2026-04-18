import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

type Props = {
  isSubmitting: boolean;
  title?: string;
};

export const DeployAirdropMasterCTA = ({ isSubmitting, title }: Props) => {
  return (
    <Button
      type="submit"
      className="w-full bg-linear-to-r from-amber-600 to-yellow-600 hover:from-yellow-700 hover:to-amber-700"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
          Deploying Airdrop Master...
        </>
      ) : (
        <>
          <Rocket className="mr-2 h-4 w-4" />
          {title ? title : " Deploy Airdrop Master"}
        </>
      )}
    </Button>
  );
};
