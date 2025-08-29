import { isAddress } from 'viem';
import { queryBirdeye } from './base';
import type { Price } from './types';

export const getPrices = async (addresses: string[]): Promise<Record<string, Price | null>> => {
  const chain = isAddress(addresses[0] as string) ? 'base' : 'solana';
  return queryBirdeye<Record<string, Price>>(
    'defi/multi_price',
    { list_address: addresses.join(','), include_liquidity: 'true' },
    chain,
  );
};
