import { useQuery } from "@tanstack/react-query";
import { sepolia } from "viem/chains";
import { usePublicClient } from "wagmi";

export type UseEnsTextsProps = {
  name: string;
  keys: string[];
  enabled?: boolean;
};

export function useEnsTexts({ name, keys, enabled = true }: UseEnsTextsProps) {
  const wagmiClient = usePublicClient({ chainId: sepolia.id });

  return useQuery({
    queryKey: ["ens-texts", name, keys],
    queryFn: async () => {
      if (!wagmiClient) {
        throw new Error("Public client not available");
      }

      const promises = keys.map((key) => wagmiClient.getEnsText({ name, key }).catch(() => null));
      const results = await Promise.all(promises);

      return keys.map((key, index) => ({ key, value: results[index] }));
    },
    enabled: enabled && !!name && !!wagmiClient,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry if it's just a missing record
      if (error instanceof Error && error.message.includes("resolver")) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// Helper hook specifically for Bubbles profile data
export function useBubblesProfile(ensName: string) {
  const {
    data: textRecords,
    isLoading,
    error,
  } = useEnsTexts({
    name: ensName,
    keys: ["description", "bubbles.preferred-payment", "bubbles.avatar"],
    enabled: !!ensName,
  });

  const profileData = textRecords
    ? {
        description: textRecords.find((r) => r.key === "description")?.value || "",
        preferredPayment: textRecords.find((r) => r.key === "bubbles.preferred-payment")?.value || "",
        avatar: textRecords.find((r) => r.key === "bubbles.avatar")?.value || "",
      }
    : null;

  return {
    profileData,
    textRecords,
    isLoading,
    error,
  };
}
