import { isAddress } from 'viem';
import { queryBirdeye } from './base';
import {
  type TopTradersByTokenResponse,
  TopTradersByTokenSortBy,
  TopTradersByTokenSortType,
  TopTradersByTokenTimeFrame,
} from './types';

interface GetTopTradersByTokenParams {
  address: string;
  timeFrame?: TopTradersByTokenTimeFrame;
  sortType?: TopTradersByTokenSortType;
  sortBy?: TopTradersByTokenSortBy;
  offset?: number;
  limit?: number;
}

export const getTopTradersByToken = async ({
  address,
  timeFrame = TopTradersByTokenTimeFrame.TwentyFourHours,
  sortType = TopTradersByTokenSortType.Descending,
  sortBy = TopTradersByTokenSortBy.Volume,
  offset = 0,
  limit = 10,
}: GetTopTradersByTokenParams): Promise<TopTradersByTokenResponse> => {
  const chain = isAddress(address) ? 'base' : 'solana';
  return queryBirdeye<TopTradersByTokenResponse>(
    'defi/v2/tokens/top_traders',
    {
      address,
      time_frame: timeFrame,
      sort_type: sortType,
      sort_by: sortBy,
      offset,
      limit,
    },
    chain,
  );
};
