'use client';

import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { wagmiConfig } from '@/config/wagmi';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { walletStore } from '@/store/wallet';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function WalletListener() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    walletStore.getState().setAddress(address || '');
    walletStore.getState().setConnected(isConnected);
    console.log('provider', address, isConnected);
  }, [address, isConnected]);

  return null;
}
const queryClient = new QueryClient();
export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WalletListener />
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
