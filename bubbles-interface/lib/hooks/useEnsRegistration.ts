import { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ENS_CONFIG, getFullEnsName, isValidSubdomain } from '@/lib/ens-config';

export interface ProfileData {
  name: string;
  avatar: string;
  preferredPayment: string;
  description?: string;
}

interface ENSMessage {
  name: string;
  owner: string;
  addresses: {
    '60': string;
  };
  texts: {
    [ENS_CONFIG.TEXT_KEYS.DESCRIPTION]: string;
    [ENS_CONFIG.TEXT_KEYS.PREFERRED_PAYMENT]: string;
    [ENS_CONFIG.TEXT_KEYS.BUBBLES_PROFILE]: string;
    [ENS_CONFIG.TEXT_KEYS.BUBBLES_AVATAR]: string;
    [ENS_CONFIG.TEXT_KEYS.BUBBLES_CREATED]: string;
  };
}

interface WorkerRequest {
  signature: {
    hash: string;
    message: ENSMessage;
  };
  expiration: number;
}

export function useEnsRegistration() {
  const { address } = useAccount();
  const { signMessage } = useSignMessage();

  const registerProfile = useMutation({
    mutationFn: async (profileData: ProfileData) => {
      if (!address) {
        throw new Error('Wallet not connected');
      }

      // Validate subdomain format
      if (!isValidSubdomain(profileData.name)) {
        throw new Error('Name must be lowercase alphanumeric with hyphens only (3-50 chars)');
      }

      const ensName = getFullEnsName(profileData.name);

      // Create ENS message with profile data
      const nameData: ENSMessage = {
        name: ensName,
        owner: address,
        addresses: {
          '60': address,
        },
        texts: {
          [ENS_CONFIG.TEXT_KEYS.DESCRIPTION]: profileData.description || 'Bubbles user - Send me compliments!',
          [ENS_CONFIG.TEXT_KEYS.PREFERRED_PAYMENT]: profileData.preferredPayment,
          [ENS_CONFIG.TEXT_KEYS.BUBBLES_PROFILE]: JSON.stringify({
            avatar: profileData.avatar,
            preferredPayment: profileData.preferredPayment,
            createdAt: new Date().toISOString(),
            version: '1.0',
            platform: 'bubbles',
          }),
          [ENS_CONFIG.TEXT_KEYS.BUBBLES_AVATAR]: profileData.avatar,
          [ENS_CONFIG.TEXT_KEYS.BUBBLES_CREATED]: new Date().toISOString(),
        },
      };

      // Sign the message
      const signature = await signMessage({
        message: JSON.stringify(nameData),
      });

      // Prepare request for ENS gateway
      const requestBody: WorkerRequest = {
        signature: {
          hash: signature,
          message: nameData,
        },
        expiration: new Date().getTime() + 60 * 60 * 1000, // 1 hour
      };

      // Submit to ENS gateway (you'll need to set up your own gateway)
      const response = await fetch('/api/ens/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      return await response.json();
    },
    onSuccess: (data) => {
      toast.success('Profile registered successfully!');
      return data;
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
      throw error;
    },
  });

  return {
    registerProfile: registerProfile.mutateAsync,
    isRegistering: registerProfile.isPending,
    error: registerProfile.error,
  };
}