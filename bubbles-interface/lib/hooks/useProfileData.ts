import { ENS_CONFIG, getFullEnsName, isValidSubdomain } from "@/lib/ens-config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { useBubblesProfile } from "./useEnsTexts";
import useSessionKey from "./useSessionKey";

export interface ProfileFormData {
  ensHandle: string;
  selectedAvatar: string;
  selectedPayment: {
    token: string;
    chainId: string;
    description: string;
  };
}

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

export function useProfileData() {
  const { walletClient } = useSessionKey();

  const [profileData, setProfileData] = useLocalStorage<ProfileFormData | null>("bubbles-profile", null);

  // Check if user already has a profile
  const ensName = profileData?.ensHandle ? getFullEnsName(profileData.ensHandle) : "";
  const { profileData: existingProfile } = useBubblesProfile(ensName);

  const {
    mutateAsync: saveProfile,
    error: saveProfileError,
    isPending: isProfileSaving,
  } = useMutation({
    mutationFn: async (formData: ProfileFormData) => {
      try {
        if (!walletClient) {
          throw new Error("Wallet not connected");
        }

        const preferredPayment = `ethereum:${formData.selectedPayment.chainId}:${formData.selectedPayment.token}`;

        const address = walletClient.address;

        // Validate subdomain format
        if (!isValidSubdomain(formData.ensHandle)) {
          throw new Error("Name must be lowercase alphanumeric with hyphens only (3-50 chars)");
        }

        const ensName = getFullEnsName(formData.ensHandle);

        // Create ENS message with profile data
        const nameData: WorkerRequest["signature"]["message"] = {
          name: ensName,
          owner: address,
          addresses: {
            "60": address,
          },
          texts: {
            description: "Bubbles user - Send me compliments!",
            url: "https://bubbles-pay.vercel.app/profile/" + ensName,
            [ENS_CONFIG.TEXT_KEYS.PREFERRED_PAYMENT]: preferredPayment,
            [ENS_CONFIG.TEXT_KEYS.BUBBLES_AVATAR]: formData.selectedAvatar,
          },
        };

        const signature = await walletClient!.signMessage({
          message: JSON.stringify(nameData),
        });

        // Prepare request for ENS gateway
        const requestBody: WorkerRequest = {
          signature: {
            hash: signature,
            message: nameData,
          },
          expiration: new Date().getTime() + 60 * 60, // 1 hour
        };

        // Submit to ENS gateway (you'll need to set up your own gateway)
        const response = await fetch(ENS_CONFIG.GATEWAY_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const body = (await response.json()) as { success: boolean };
        if (!response.ok || !body.success) {
          const error = await response.json();
          throw new Error(error.message || "Registration failed");
        }

        return formData;
      } catch (error) {
        console.error("Failed to save profile:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Profile successfully registered
      console.log("Profile registered successfully");
      setProfileData(data);
    },
    onError: (error: any) => {
      console.error("Profile registration error:", error);
      toast.error(error?.message || "Profile registration failed");
    },
    throwOnError: true,
  });

  return {
    profileData,
    existingProfile,
    isProfileSaving,
    saveProfileError,
    saveProfile,
    setProfileData,
  };
}
