import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ENS_CONFIG, getFullEnsName, isValidSubdomain } from "@/lib/ens-config";
import useSessionKey from "./useSessionKey";

export interface ProfileData {
  name: string;
  avatar: string;
  preferredPayment: string;
}

export interface WorkerRequest {
  signature: {
    message: {
      name: string;
      owner: string;
      addresses?: Record<string, string | undefined> | undefined;
      texts?: Record<string, string | undefined> | undefined;
      contenthash?: string | undefined;
    };
    hash: string;
  };
  expiration: number;
}

export function useEnsRegistration() {
  const { walletClient } = useSessionKey();

  const registerProfile = useMutation({
    mutationFn: async (profileData: ProfileData) => {
      if (!walletClient) {
        throw new Error("Wallet not connected");
      }

      const address = walletClient.address;

      // Validate subdomain format
      if (!isValidSubdomain(profileData.name)) {
        throw new Error("Name must be lowercase alphanumeric with hyphens only (3-50 chars)");
      }

      const ensName = getFullEnsName(profileData.name);

      //   name: 'wtafwsu234.offchaindemo.eth',
      // owner: address!,
      // addresses: {
      //   '60': address!,
      // },
      // texts: {
      //   description: 'Bubbles user - Send me compliments!',
      //   url: 'https://hello.com',
      //   'com.github': 'owiejo',
      //   preferredPayment: 'base:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      //   'com.bubbles.avatar': '👼',
      // },
      // Create ENS message with profile data
      const nameData: WorkerRequest["signature"]["message"] = {
        // name: ensName,
        // owner: address,
        // addresses: {
        //   "60": address,
        // },
        // texts: {
        //   description: "Bubbles user - Send me compliments!",
        //   [ENS_CONFIG.TEXT_KEYS.PREFERRED_PAYMENT]: profileData.preferredPayment,
        //   [ENS_CONFIG.TEXT_KEYS.BUBBLES_AVATAR]: profileData.avatar,
        // },
        name: "wtafwsu2345.offchaindemo.eth",
        owner: address!,
        addresses: {
          "60": address!,
        },
        texts: {
          description: "Bubbles user - Send me compliments!",
          url: "https://hello.com",
          "com.github": "owiejo",
          preferredPayment: "base:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
          "com.bubbles.avatar": "👼",
        },
      };

      console.log(nameData);

      const signature = await walletClient!.signMessage({
        message: JSON.stringify(nameData),
      });

      console.log(signature);
      // Prepare request for ENS gateway
      const requestBody: WorkerRequest = {
        signature: {
          hash: signature,
          message: nameData,
        },
        expiration: new Date().getTime() + 60 * 60, // 1 hour
      };

      // Submit to ENS gateway (you'll need to set up your own gateway)
      const response = await fetch("https://ens-gateway.gregskril.workers.dev/set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const body = await response.json();
      if (!response.ok || !body.success) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      return (await response.json()) as { success: boolean };
    },
    onSuccess: (data) => {
      toast.success("Profile registered successfully!");
      return data;
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Registration failed";
      toast.error(message);
      console.log(error);
    },
  });

  return {
    registerProfile: registerProfile.mutateAsync,
    isRegistering: registerProfile.isPending,
    error: registerProfile.error,
  };
}
