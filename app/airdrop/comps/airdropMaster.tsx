import { useSolana } from "@/lib/context/solana-provider";
import { useFetchAirdropMaster } from "@/features/airdrop-master/use-get-airdrop-master";
import { address, isAddress } from "gill";
import React, { useEffect } from "react";
//import { FeeStructure } from "./fee-structure";
import { AirdropMaster } from "@dropsy/airdrop";

const AirdropMasterOverview = ({
  id,
  setAirdropMaster,
}: {
  id: string;
  setAirdropMaster: React.Dispatch<
    React.SetStateAction<AirdropMaster | undefined>
  >;
}) => {
  const { rpc } = useSolana();
  const masterAddress = id && isAddress(id) ? address(id) : null;
  const { data, isLoading, error, refetch } = useFetchAirdropMaster(
    rpc,
    masterAddress,
  );

  useEffect(() => {
    if (data?.data) {
      setAirdropMaster(data.data);
    }
  }, [data, setAirdropMaster]);

  if (isLoading) {
    return <h1>Loading airdrop master ...</h1>;
  }

  if (error || !data || !isAddress(id)) {
    return <h1>{"Error loading this airdrop master " + error?.message} </h1>;
  }
  return (
    <div>
      <h1>Hi Master</h1>
    </div>
  );
};

export default AirdropMasterOverview;
