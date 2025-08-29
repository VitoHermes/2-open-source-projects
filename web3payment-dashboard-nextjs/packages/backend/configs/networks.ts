import { base, baseSepolia, bsc, bscTestnet, mainnet } from 'wagmi/chains';
import { type NetworkConfig } from '../types/network-config';

export const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';
export const ENSO_DEAD_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
export const NETWORK_CONFIG: { [key: number]: NetworkConfig } = {
  [baseSepolia.id]: {
    nativeCurrency: baseSepolia.nativeCurrency.name,
    networkName: baseSepolia.name,
    multicall3: baseSepolia.contracts.multicall3.address ?? '0xcA11bde05977b3631167028862bE2a173976CA11',
    rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
      ? `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      : process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || baseSepolia.rpcUrls.default.http[0],
    explorerUrl: {
      tx: 'https://sepolia.basescan.org/tx',
      address: 'https://sepolia.basescan.org/address',
      block: 'https://sepolia.basescan.org/block',
      token: 'https://sepolia.basescan.org/token',
      nft: 'https://sepolia.basescan.org/nft',
    },
    contracts: {
      coolOffPay: '0x4c68b8698e00633F6d2f02CB4A97f38a4A0D0cA7',
      pushpay: '0x1C004f44E0C10F27fE567418974F7357A8345208',
      pullpay: '0xF6371b57243bf540762D360f035398a3D33FDdC3',
      delegateMint: '0xcF775Ce7cF7C02B69805BeCfDbA92268B66B0829',
      tokens: [
        {
          address: DEAD_ADDRESS,
          label: 'ETH',
          decimals: 18,
        },
        {
          address: '0xdE100E7D198528D5DE5603c76974666AdED6Bc7D',
          label: 'USDC',
          decimals: 6,
        },
        {
          address: '0xF517Ec48402D799fbCacaE3161E4401FAeE13f33',
          label: 'USDT',
          decimals: 6,
        },
      ],
    },
    subgraphUrl: process.env.NEXT_PUBLIC_SUBGRAPH_BASE_SEPOLIA_URL!,
  },
  [bscTestnet.id]: {
    nativeCurrency: bscTestnet.nativeCurrency.name,
    networkName: bscTestnet.name,
    multicall3: bscTestnet.contracts.multicall3.address ?? '0xcA11bde05977b3631167028862bE2a173976CA11',
    rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
      ? `https://bnb-testnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      : process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL || bscTestnet.rpcUrls.default.http[0],
    explorerUrl: {
      tx: 'https://testnet.bscscan.com/tx',
      address: 'https://testnet.bscscan.com/address',
      block: 'https://testnet.bscscan.com/block',
      token: 'https://testnet.bscscan.com/token',
      nft: 'https://testnet.bscscan.com/nft',
    },
    contracts: {
      coolOffPay: '0xFF8960FfED467b12e898Ea1A5bcE1Cc294dA2BB2',
      pushpay: '0x59E8B08188Cc22039AC7d6E9D1f486eaF429a440',
      pullpay: '0xC6610642811b42877A7dD4f907C2EAe32b1B4B4A',
      delegateMint: '0x0C4e4F293Dd5204Cd4dfC92d7B9f8cF91d36bB5b',
      tokens: [
        {
          address: DEAD_ADDRESS,
          label: 'BNB',
          decimals: 18,
        },
        {
          address: '0x899f6Ca432Bc7D53e918B27794082df25126b08a',
          label: 'USDC',
          decimals: 18,
        },
        {
          address: '0x8a8A53dE18bF223395E04947d76fC0eCebca45a6',
          label: 'USDT',
          decimals: 18,
        },
        {
          address: '0xC0d69626107D49AE3884d4395951a4E26E938b37',
          label: 'BUSD',
          decimals: 18,
        },
      ],
    },
    subgraphUrl: process.env.NEXT_PUBLIC_SUBGRAPH_BSC_TESTNET_URL!,
  },

  [mainnet.id]: {
    nativeCurrency: mainnet.nativeCurrency.name,
    networkName: mainnet.name,
    multicall3: mainnet.contracts.multicall3.address ?? '0xcA11bde05977b3631167028862bE2a173976CA11',
    rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
      ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      : process.env.NEXT_PUBLIC_MAINNET_RPC_URL || mainnet.rpcUrls.default.http[0],
    explorerUrl: {
      tx: 'https://etherscan.io/tx',
      address: 'https://etherscan.io/address',
      block: 'https://etherscan.io/block',
      token: 'https://etherscan.io/token',
      nft: 'https://etherscan.io/nft',
    },
    contracts: {
      coolOffPay: '0x',
      pushpay: '0x3c9165074bCB85eAcc9107132935Ef83caF5b984',
      pullpay: '0x',
      delegateMint: '0x',
      tokens: [
        {
          address: DEAD_ADDRESS,
          label: 'ETH',
          decimals: 18,
        },
        {
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          label: 'USDC',
          decimals: 6,
        },
        {
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          label: 'USDT',
          decimals: 6,
        },
      ],
    },
    subgraphUrl: process.env.NEXT_PUBLIC_SUBGRAPH_MAINNET_URL!,
  },
  [base.id]: {
    nativeCurrency: base.nativeCurrency.name,
    networkName: base.name,
    multicall3: base.contracts.multicall3.address ?? '0xcA11bde05977b3631167028862bE2a173976CA11',
    rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
      ? `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      : process.env.NEXT_PUBLIC_BASE_MAINNET_RPC_URL || base.rpcUrls.default.http[0],
    explorerUrl: {
      tx: 'https://basescan.org/tx',
      address: 'https://basescan.org/address',
      block: 'https://basescan.org/block',
      token: 'https://basescan.org/token',
      nft: 'https://basescan.org/nft',
    },
    contracts: {
      coolOffPay: '0x',
      pushpay: '0x832Cd6f89d21224D1fa27E9165B29FC9885F31Bc',
      pullpay: '0x',
      delegateMint: '0x',
      tokens: [
        {
          address: DEAD_ADDRESS,
          label: 'ETH',
          decimals: 18,
        },
        {
          address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
          label: 'USDC',
          decimals: 6,
        },
        {
          address: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
          label: 'USDT',
          decimals: 6,
        },
      ],
    },
    subgraphUrl: process.env.NEXT_PUBLIC_SUBGRAPH_BASE_MAINNET_URL!,
  },
  [bsc.id]: {
    nativeCurrency: bsc.nativeCurrency.name,
    networkName: bsc.name,
    multicall3: bsc.contracts.multicall3.address ?? '0xcA11bde05977b3631167028862bE2a173976CA11',
    rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
      ? `https://bnb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      : process.env.NEXT_PUBLIC_BSC_MAINNET_RPC_URL || bsc.rpcUrls.default.http[0],
    explorerUrl: {
      tx: 'https://bscscan.com/tx',
      address: 'https://bscscan.com/address',
      block: 'https://bscscan.com/block',
      token: 'https://bscscan.com/token',
      nft: 'https://bscscan.com/nft',
    },
    contracts: {
      coolOffPay: '0x',
      pushpay: '0x832Cd6f89d21224D1fa27E9165B29FC9885F31Bc',
      pullpay: '0x',
      delegateMint: '0x',
      tokens: [
        {
          address: DEAD_ADDRESS,
          label: 'BNB',
          decimals: 18,
        },
        {
          address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          label: 'USDC',
          decimals: 18,
        },
        {
          address: '0x55d398326f99059ff775485246999027b3197955',
          label: 'USDT',
          decimals: 18,
        },
      ],
    },
    subgraphUrl: process.env.NEXT_PUBLIC_SUBGRAPH_BSC_MAINNET_URL!,
  },
};
