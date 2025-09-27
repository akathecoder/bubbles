"use client";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { SuiWalletConnectors } from "@dynamic-labs/sui";
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
        <DynamicContextProvider
          settings={{
            environmentId: "c5735bc8-84cc-4a26-a7d4-0cd948285a0e",
            walletConnectors: [
              BitcoinWalletConnectors,
              EthereumWalletConnectors,
              SolanaWalletConnectors,
              SuiWalletConnectors,
            ],
          }}
        >
          {children}
        </DynamicContextProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default Providers;
