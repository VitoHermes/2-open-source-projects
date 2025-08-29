import type { BaseResponse } from './types';

export const queryBirdeye = async <T>(
  endpoint: string,
  params?: Record<string, string | number>,
  chain = 'base',
): Promise<T> => {
  const url = new URL(`https://public-api.birdeye.so/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      'X-API-KEY': process.env.BIRDEYE_API_KEY || '',
      accept: 'application/json',
      'X-Chain': chain,
    },
  });

  if (!response.ok) {
    throw new Error(`Birdeye API error: ${response.status}`);
  }

  const data: BaseResponse<T> = await response.json();

  if (!data.success) {
    throw new Error(`Birdeye API error`);
  }

  return data.data;
};
