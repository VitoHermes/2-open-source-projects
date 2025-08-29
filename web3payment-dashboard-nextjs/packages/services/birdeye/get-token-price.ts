import { queryBirdeye } from './base';
import type { Price } from './types';

export const getTokenPrice = async (address: string, chain: string): Promise<Price> => {
  return queryBirdeye<Price>('defi/price', { address, include_liquidity: 'true' }, chain);
};
