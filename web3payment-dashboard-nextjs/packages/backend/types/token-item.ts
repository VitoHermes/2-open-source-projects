import type { Hex } from 'viem';

export interface TokenItem {
  label: string;
  address: Hex;
  decimals: number;
}
