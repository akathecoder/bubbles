// ENS Configuration
export const ENS_CONFIG = {
  // Main domain for subdomain registration
  DOMAIN: "offchaindemo.eth",

  // Gateway URL for ENS registration
  GATEWAY_URL: "https://ens-gateway.gregskril.workers.dev/set",

  // Chain ID for ENS resolution (mainnet)
  CHAIN_ID: 1,

  // Bubbles-specific ENS text record keys
  TEXT_KEYS: {
    DESCRIPTION: "description",
    PREFERRED_PAYMENT: "preferredPayment",
    BUBBLES_AVATAR: "com.bubbles.avatar",
  },
} as const;

// Helper to construct full ENS name
export function getFullEnsName(subdomain: string): string {
  return `${subdomain}.${ENS_CONFIG.DOMAIN}`;
}

// Helper to extract subdomain from full ENS name
export function getSubdomain(fullEnsName: string): string {
  return fullEnsName.replace(`.${ENS_CONFIG.DOMAIN}`, "");
}

// Validate subdomain format
export function isValidSubdomain(subdomain: string): boolean {
  const regex = /^[a-z0-9-]+$/;
  return regex.test(subdomain) && subdomain.length >= 3 && subdomain.length <= 50;
}
