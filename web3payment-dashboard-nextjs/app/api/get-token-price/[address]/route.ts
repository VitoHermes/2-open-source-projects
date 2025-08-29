import { getTokenPrice } from '@/packages/services/birdeye';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  address: string;
  chainName: string;
}

export const GET = async (request: NextRequest, { params }: { params: Promise<Params> }) => {
  const { address } = await params;
  const url = new URL(request.url);
  const chainName = url.searchParams.get('chainName');

  const price = await getTokenPrice(address, chainName ?? 'base');

  return NextResponse.json(price);
};
