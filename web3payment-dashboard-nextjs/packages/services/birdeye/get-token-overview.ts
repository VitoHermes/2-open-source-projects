import { isAddress } from 'viem';
import { queryBirdeye } from './base';
import type { TokenOverview } from './types/token-overview';

export const getTokenOverview = async (address: string, network?: string): Promise<TokenOverview> => {
  const chain = network ? network : isAddress(address) ? 'base' : 'solana';

  if (!address) {
    throw new Error('Please provide a valid address');
  }
  return await queryBirdeye<TokenOverview>('defi/token_overview', { address }, chain);
};
