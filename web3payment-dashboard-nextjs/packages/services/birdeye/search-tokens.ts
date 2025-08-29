import { queryBirdeye } from './base';
import type { SearchResponse } from './types/search';

interface SearchTokensParams {
  keyword: string;
  verifyToken?: boolean;
  offset?: number;
  limit?: number;
  chain?: string;
  network?: string;
}

export const searchTokens = async ({
  keyword,
  verifyToken,
  offset = 0,
  limit = 20,
  network = 'base',
}: SearchTokensParams): Promise<SearchResponse> => {
  const params: Record<string, string | number> = {
    keyword,
    target: 'token',
    sort_by: 'marketcap',
    sort_type: 'desc',
    search_by: 'name',
    offset,
    limit,
  };

  if (verifyToken !== undefined) {
    params.verify_token = verifyToken.toString();
  }

  return queryBirdeye<SearchResponse>('defi/v3/search', params, network);
};
