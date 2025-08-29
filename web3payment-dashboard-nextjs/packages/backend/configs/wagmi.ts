import { createConfig } from '@privy-io/wagmi';
import type { FallbackTransport } from 'viem';
import { base, baseSepolia, bsc, bscTestnet, mainnet } from 'viem/chains';
import { type Transport, cookieStorage, createStorage, fallback, http } from 'wagmi';
import { isProd } from '../utils/constants';
import { NETWORK_CONFIG } from './networks';

export const supportedChains = isProd ? ([mainnet, base, bsc] as const) : ([baseSepolia, bscTestnet] as const);
const transports: Record<number, FallbackTransport<Transport[]>> = isProd
  ? {
      [mainnet.id]: fallback([
        http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        http(`${NETWORK_CONFIG[mainnet.id]?.rpcUrl}`),
        http(),
      ]),
      [base.id]: fallback([
        http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        http(`${NETWORK_CONFIG[base.id]?.rpcUrl}`),
        http(),
      ]),
      [bsc.id]: fallback([
        http(`https://bnb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        http(`${NETWORK_CONFIG[bsc.id]?.rpcUrl}`),
        http(),
      ]),
    }
  : {
      [baseSepolia.id]: fallback([
        http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        http(`${NETWORK_CONFIG[baseSepolia.id]?.rpcUrl}`),
        http(),
      ]),
      [bscTestnet.id]: fallback([
        http(`https://bnb-testnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        http(`${NETWORK_CONFIG[bscTestnet.id]?.rpcUrl}`),
        http(),
      ]),
    };

export const wagmiConfig = createConfig({
  chains: supportedChains,
  transports,
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  cacheTime: 1000 * 60 * 5, // 5 minutes
  batch: {
    multicall: true,
  },
});
