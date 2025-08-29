import { formatUnits, type Hex } from 'viem';
import { base, baseSepolia, bsc, bscTestnet, mainnet } from 'viem/chains';
import { DEAD_ADDRESS, ENSO_DEAD_ADDRESS } from '../configs/networks';

export const isNativeCurrency = (address: Hex) => {
  return (
    address?.toLowerCase() === DEAD_ADDRESS.toLowerCase() || address?.toLowerCase() === ENSO_DEAD_ADDRESS.toLowerCase()
  );
};

const MAPPED_CHAINS: Record<number, string> = {
  [mainnet.id]: 'ethereum',
  [base.id]: 'ethereum',
  [baseSepolia.id]: 'ethereum',
  [bsc.id]: 'bsc',
  [bscTestnet.id]: 'bsc',
};

export const getTokenPrice = async (address: string, chainId: number) => {
  if (!isNativeCurrency(address as Hex)) {
    return 1;
  }
  const chainName = MAPPED_CHAINS[chainId] ?? 'ethereum';
  // calculate the price of the native token
  if (chainName === 'ethereum') {
    //eth
    address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
  }
  if (chainName === 'bsc') {
    //bnb
    address = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
  }

  const response = await fetch(`${window.location.origin}/api/get-token-price/${address}?chainName=${chainName}`);
  const data = await response.json();
  return data.value;
};

export const getTokenPriceInUSD = async (tokenAddress: Hex, chainId: number, balance: bigint, decimals: number) => {
  try {
    const price = await getTokenPrice(tokenAddress, chainId);
    return Number(price) * Number(formatUnits(balance ?? 0, decimals));
  } catch (error) {
    console.error('Error to get token price in USD, error msg:', error);
    return 0;
  }
};
