import { useEnsName, useEnsAvatar } from 'wagmi'
import { useBubblesProfile } from './useEnsTexts'

export interface EnsUser {
  address: `0x${string}`
  ensName: string | null
  displayName: string
  avatar: string | null
  description: string | null
  preferredPayment: string | null
  isLoading: boolean
  error: Error | null
}

/**
 * Hook to fetch complete user data from ENS records
 * Given an address, fetches ENS name, avatar, and Bubbles profile data
 */
export function useEnsUser(address: `0x${string}` | undefined): EnsUser {
  // Get ENS name from address
  const {
    data: ensName,
    isLoading: isNameLoading,
    error: nameError
  } = useEnsName({
    address,
    chainId: 1,
  })

  // Get ENS avatar
  const {
    data: ensAvatar,
    isLoading: isAvatarLoading
  } = useEnsAvatar({
    name: ensName || undefined,
    chainId: 1,
  })

  // Get Bubbles profile data from ENS text records
  const {
    profileData: ensProfile,
    isLoading: isProfileLoading,
    error: profileError
  } = useBubblesProfile(ensName || "")

  // Compute derived values
  const displayName = ensName
    ? ensName.replace('.eth', '')
    : address
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : "Unknown"

  const avatar = ensProfile?.avatar || ensAvatar || "/placeholder-avatar.jpg"

  const isLoading = isNameLoading || isAvatarLoading || isProfileLoading

  const error = nameError || profileError || null

  return {
    address: address || "0x0000000000000000000000000000000000000000",
    ensName,
    displayName,
    avatar,
    description: ensProfile?.description || null,
    preferredPayment: ensProfile?.preferredPayment || null,
    isLoading,
    error,
  }
}

