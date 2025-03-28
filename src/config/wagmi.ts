import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID');
}

export const wagmiConfig = getDefaultConfig({
  appName: 'WisdomSeed College',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, sepolia],
  // 配置每个链的 RPC 传输层
  transports: {
    [mainnet.id]: http(mainnet.rpcUrls.default.http[0]),
    [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
  },
  ssr: true,
});
