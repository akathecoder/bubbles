import { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useEnsRegistration, ProfileData } from './useEnsRegistration';
import { useBubblesProfile } from './useEnsTexts';
import { getFullEnsName } from '@/lib/ens-config';

export interface ProfileFormData {
  ensHandle: string;
  selectedAvatar: string;
  selectedPayment: {
    id: string;
    token: string;
    tokenName: string;
    chain: string;
    chainId: string;
    icon: string;
    description: string;
    address?: string;
  };
}

export function useProfileData() {
  const { address } = useAccount();
  const { registerProfile, isRegistering, error } = useEnsRegistration();

  const [profileData, setProfileData] = useState<ProfileFormData | null>(null);
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  // Check if user already has a profile
  const ensName = profileData?.ensHandle ? getFullEnsName(profileData.ensHandle) : '';
  const { profileData: existingProfile, hasProfile } = useBubblesProfile(ensName);

  const saveProfile = useCallback(async (formData: ProfileFormData) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    const profilePayload: ProfileData = {
      name: formData.ensHandle,
      avatar: formData.selectedAvatar,
      preferredPayment: formData.selectedPayment.address
        ? `${formData.selectedPayment.chainId}:${formData.selectedPayment.address}`
        : `${formData.selectedPayment.chainId}:${formData.selectedPayment.token}`,
      description: `Bubbles user - Send me compliments!`,
    };

    try {
      await registerProfile(profilePayload);
      setProfileData(formData);
      setIsProfileSaved(true);

      // Store locally for quick access
      localStorage.setItem('bubbles-profile', JSON.stringify(formData));

      return true;
    } catch (error) {
      console.error('Failed to save profile:', error);
      throw error;
    }
  }, [address, registerProfile]);

  const loadLocalProfile = useCallback(() => {
    const stored = localStorage.getItem('bubbles-profile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfileData(parsed);
        return parsed;
      } catch {
        localStorage.removeItem('bubbles-profile');
      }
    }
    return null;
  }, []);

  const clearProfile = useCallback(() => {
    setProfileData(null);
    setIsProfileSaved(false);
    localStorage.removeItem('bubbles-profile');
  }, []);

  return {
    profileData,
    existingProfile,
    hasProfile,
    isProfileSaved,
    isRegistering,
    error,
    saveProfile,
    loadLocalProfile,
    clearProfile,
    setProfileData,
  };
}