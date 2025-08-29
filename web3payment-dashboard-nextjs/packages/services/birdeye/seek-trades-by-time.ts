import { isAddress } from 'viem';
import { queryBirdeye } from './base';
import type { TradesResponse, TxType } from './types/trades';

interface SeekTradesByTimeParams {
  address: string;
  offset?: number;
  limit?: number;
  txType?: TxType;
  beforeTime?: number;
  afterTime?: number;
}

export const seekTradesByTime = async ({
  address,
  offset = 0,
  limit = 100,
  txType = 'swap',
  beforeTime = 0,
  afterTime = 0,
}: SeekTradesByTimeParams): Promise<TradesResponse> => {
  const chain = isAddress(address) ? 'base' : 'solana';
  return queryBirdeye<TradesResponse>(
    'trader/txs/seek_by_time',
    {
      address,
      offset,
      limit,
      tx_type: txType,
      before_time: beforeTime,
      after_time: afterTime,
    },
    chain,
  );
};
