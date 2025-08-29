import { isAddress } from 'viem';
import { queryBirdeye } from './base';
import { type OHLCVResponse, OHLCVTimeframe } from './types/ohlcv';

interface FetchOHLCVParams {
  address: string;
  timeframe?: OHLCVTimeframe;
  timeFrom: number;
  timeTo: number;
}

export const fetchOHLCV = async ({
  address,
  timeframe = OHLCVTimeframe.FifteenMinutes,
  timeFrom,
  timeTo,
}: FetchOHLCVParams): Promise<OHLCVResponse> => {
  const chain = isAddress(address) ? 'base' : 'solana';
  return queryBirdeye<OHLCVResponse>(
    'defi/ohlcv',
    {
      address,
      type: timeframe,
      time_from: timeFrom,
      time_to: timeTo,
    },
    chain,
  );
};
