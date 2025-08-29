import { zeroAddress } from 'viem';
import { base, baseSepolia, bsc, bscTestnet, mainnet } from 'wagmi/chains';

export const deploymentEnv = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV;
export const isProd = deploymentEnv === 'production' || deploymentEnv === 'prod';
export const isDevelopment = !isProd;

export const MAX_LINES_OF_TEXT = 476;
export const QUERY_GC_TIME = 20 * 1000; // 20 seconds
export const QUERY_REFETCH_INTERVAL = 5000; // 5 seconds
export const DEFAULT_FX_RATE = 871400;
export const WALLET_CONNECT_CONNECTOR_ID = 'wallet_connect';
export const ZERO_ADDRESS = zeroAddress;

export const DEFAULT_CHAIN = isProd ? base : baseSepolia;

export const CHAIN_OPTIONS = isProd
  ? [
      { label: mainnet.name, value: mainnet.id, logo: '/logos/eth.png' },
      { label: base.name, value: base.id, logo: '/logos/base.png' },
      { label: bsc.name, value: bsc.id, logo: '/logos/bsc.png' },
    ]
  : [
      { label: baseSepolia.name, value: baseSepolia.id, logo: '/logos/base.png' },
      { label: bscTestnet.name, value: bscTestnet.id, logo: '/logos/bsc.png' },
    ];
