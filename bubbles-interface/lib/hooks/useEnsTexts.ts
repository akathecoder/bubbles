import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { ENS_CONFIG } from "@/lib/ens-config";

export interface UseEnsTextsProps {
  name: string;
  keys: string[];
  enabled?: boolean;
}

export interface EnsTextRecord {
  key: string;
  value: string | null;
}

export function useEnsTexts({ name, keys, enabled = true }: UseEnsTextsProps) {
  const publicClient = usePublicClient({ chainId: ENS_CONFIG.CHAIN_ID });

  return useQuery({
    queryKey: ["ens-texts", name, keys],
    queryFn: async (): Promise<EnsTextRecord[]> => {
      if (!publicClient) {
        throw new Error("Public client not available");
      }

      const promises = keys.map(
        (key) =>
          publicClient
            .getEnsText({
              name,
              key,
            })
            .catch(() => null), // Return null if text record doesn't exist
      );

      const results = await Promise.all(promises);

      return keys.map((key, index) => ({
        key,
        value: results[index],
      }));
    },
    enabled: enabled && !!name && !!publicClient,
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
    keys: [
      ENS_CONFIG.TEXT_KEYS.DESCRIPTION,
      ENS_CONFIG.TEXT_KEYS.PREFERRED_PAYMENT,
      ENS_CONFIG.TEXT_KEYS.BUBBLES_AVATAR,
    ],
    enabled: !!ensName,
  });

  const profileData = textRecords
    ? {
        description: textRecords.find((r) => r.key === ENS_CONFIG.TEXT_KEYS.DESCRIPTION)?.value || "",
        preferredPayment: textRecords.find((r) => r.key === ENS_CONFIG.TEXT_KEYS.PREFERRED_PAYMENT)?.value || "",
        avatar: textRecords.find((r) => r.key === ENS_CONFIG.TEXT_KEYS.BUBBLES_AVATAR)?.value || "",
      }
    : null;

  return {
    profileData,
    textRecords,
    isLoading,
    error,
  };
}
