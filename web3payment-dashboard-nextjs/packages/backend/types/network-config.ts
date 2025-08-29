import { type Hex } from 'viem';
import type { TokenItem } from './token-item';

export interface NetworkConfig {
  nativeCurrency: string;
  networkName: string;
  multicall3: string;
  explorerUrl: {
    tx: string;
    address: string;
    block: string;
    token?: string;
    nft?: string;
  };
  rpcUrl: string;
  contracts: {
    /** Cool off payment contract */
    coolOffPay: Hex;
    /** Instant payment contract */
    pushpay: Hex;
    /** Claimable payment contract */
    pullpay: Hex;
    /** Delegate mint contract */
    delegateMint: Hex;
    /** Token list */
    tokens: TokenItem[];
  };
  /** Subgraph URL */
  subgraphUrl: string;
}
