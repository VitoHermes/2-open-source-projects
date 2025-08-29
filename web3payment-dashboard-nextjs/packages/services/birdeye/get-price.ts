import { isAddress } from 'viem';
import { queryBirdeye } from './base';
import type { Price } from './types';

export const getPrice = async (address: string): Promise<Price> => {
  const chain = isAddress(address) ? 'base' : 'solana';
  return queryBirdeye<Price>('defi/price', { address, include_liquidity: 'true' }, chain);
};
