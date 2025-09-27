"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { baseSepolia, sepolia } from "viem/chains";
import { usePublicClient } from "wagmi";

const ENSTesting = () => {
  const sepoliaClient = usePublicClient({
    chainId: sepolia.id,
  });
  const query = useQuery({
    queryKey: ["test", !!sepoliaClient],
    queryFn: async () => {
      if (!sepoliaClient) throw new Error("No sepolia client");
      return await sepoliaClient.getEnsAddress({
        name: "sparsh.eth",
      });
    },
  });
  console.log(query.data, query.error, query.isLoading);

  return <div>ENSTesting</div>;
};

export default ENSTesting;
