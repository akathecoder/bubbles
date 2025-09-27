"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Borel } from "next/font/google";
import "./globals.css";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { SuiWalletConnectors } from "@dynamic-labs/sui";
import { createConfig, http } from "wagmi";
import { mainnet } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const borel = Borel({
  weight: ["400"],
});

// export const metadata: Metadata = {
//   title: "Bubbles",
//   description: "Compliments that float to you",
// };

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={`${borel.style} ${geistSans.variable} ${geistMono.variable} antialiased`}>
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
        </body>
      </QueryClientProvider>
    </html>
  );
}
