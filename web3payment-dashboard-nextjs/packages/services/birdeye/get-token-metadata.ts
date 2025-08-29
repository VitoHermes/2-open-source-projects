import { isAddress } from 'viem';
import { queryBirdeye } from './base';
import type { TokenMetadata } from './types';

export const getTokenMetadata = async (address: string): Promise<TokenMetadata> => {
  const chain = isAddress(address) ? 'base' : 'solana';
  return queryBirdeye<TokenMetadata>('defi/v3/token/meta-data/single', { address }, chain);
};
