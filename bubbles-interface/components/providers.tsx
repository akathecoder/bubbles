"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base, baseSepolia, mainnet, sepolia } from "viem/chains";
import { createConfig, http, WagmiProvider } from "wagmi";

const config = createConfig({
  chains: [mainnet, base, baseSepolia, sepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [baseSepolia.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        {children}
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default Providers;
