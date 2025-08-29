import type { Address } from '@/app/types/address-book';
import { NETWORK_CONFIG } from '@/packages/backend/configs/networks';
import IMask from 'imask';
import { type Chain, type Hex, formatUnits, isAddress, parseUnits } from 'viem';
import { anvil, base, baseSepolia, bsc, bscTestnet, mainnet } from 'viem/chains';
import { DEFAULT_CHAIN, ZERO_ADDRESS } from './constants';

// export * from '@pai-sdk/core/utils';

const MAPPING_CHAIN_ID = {
  [base.id]: 'base',
  [baseSepolia.id]: 'Base Sepolia',
  [bsc.id]: 'bsc',
  [bscTestnet.id]: 'BSC Testnet',
  [mainnet.id]: 'mainnet',
};

export const canUseGasless = (address: Hex, chainId: number) => {
  return (
    address !== ZERO_ADDRESS &&
    !!NETWORK_CONFIG[chainId] &&
    chainId === anvil.id &&
    NETWORK_CONFIG[chainId].contracts.tokens.some(val => val.address === address)
  );
};

export const getChainByChainId = (chainId: number): Chain => {
  const networkConfig = NETWORK_CONFIG[chainId];
  if (!networkConfig || !networkConfig.networkName) {
    return DEFAULT_CHAIN;
  }

  switch (chainId) {
    case mainnet.id:
      return mainnet;
    case base.id:
      return base;
    case baseSepolia.id:
      return baseSepolia;
    case bsc.id:
      return bsc;
    case bscTestnet.id:
      return bscTestnet;
    default:
      return DEFAULT_CHAIN;
  }
};

export const formatNumberInWei = (amount: bigint | number | string | undefined, decimals = 6) => {
  if (!amount || !Number(amount)) return '-';
  return formatNumber(formatUnits(BigInt(Math.round(Number(amount))), Number(decimals)));
};

export const formatNumber = (value: number | bigint | string | undefined, scale = 2) => {
  if (!value) return '-';

  const _maskedNumeric = IMask.createMask({
    mask: 'num',
    lazy: true,
    blocks: {
      num: {
        lazy: true,
        mask: Number,
        scale: scale,
        signed: false,
        normalizeZeros: true,
        thousandsSeparator: ',',
        padFractionalZeros: false,
        radix: '.',
        mapToRadix: ['.'],
      },
    },
  });

  _maskedNumeric.resolve(`${value}`);
  return _maskedNumeric.value;
};

export const formatCurrency = (value: number | bigint | string | undefined, scale = 2) => {
  if (!value) return '-';

  const maskedCurrency = IMask.createMask({
    mask: '$num',
    lazy: true,
    blocks: {
      num: {
        lazy: true,
        mask: Number,
        scale: scale,
        signed: false,
        normalizeZeros: true,
        thousandsSeparator: ',',
        padFractionalZeros: false,
        radix: '.',
        mapToRadix: ['.'],
      },
    },
  });

  maskedCurrency.resolve(`${value}`);
  return maskedCurrency.value;
};

export function shortenAddress(value?: string, digits = 4): string {
  if (!value) return '';

  return value?.slice(0, digits + 2) + '...' + value?.slice(-digits);
}

export const isSameAddress = (addr1 = '', addr2 = '') => {
  return addr1?.toLowerCase() === addr2?.toLowerCase();
};

export function getCookieValue(cookieName: string) {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(c => c.startsWith(`${cookieName}=`));
  return cookie ? cookie.split('=')[1] : null;
}

export async function validateCsvData(
  lines: string[],
  addressList: Address[],
): Promise<{ isValid: boolean; error: string; newLines: string[] }> {
  if (lines.length === 0) {
    return {
      isValid: false,
      error: 'No data found',
      newLines: [],
    };
  }

  const requiredHeaders = ['Wallet Address', 'Amount'];
  const newLines = [lines[0]];

  const headers = lines[0]?.split(',').map(header => header.trim());
  const missingHeaders = requiredHeaders.filter(header => !headers?.includes(header));

  //header check
  if (missingHeaders.length > 0 || headers?.length !== requiredHeaders.length) {
    return {
      isValid: false,
      error: "Template format error: Please ensure the uploaded file's headers match the template.",
      newLines: [],
    };
  }

  //data check
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i]?.split(',').map(value => value.trim());
    if (!row || row.length !== requiredHeaders.length) {
      continue;
    }

    const [address, amount] = row;

    if (isNaN(Number(amount))) {
      continue;
    }

    if (isAddress(address as Hex)) {
      newLines.push(row.join(','));
    } else if (addressList) {
      try {
        const searchResult = addressList.find(
          addr =>
            addr.name.toLowerCase() === address?.toLowerCase() || addr.email?.toLowerCase() === address?.toLowerCase(),
        );
        if (searchResult) {
          const newRow = [searchResult.wallet, amount];
          newLines.push(newRow.join(','));
        }
      } catch (error) {
        console.error('Error searching address book:', error);
      }
    }
  }

  if (newLines.length <= 1) {
    return {
      isValid: false,
      error: 'No valid data found',
      newLines: [],
    };
  }

  return {
    isValid: true,
    error: '',
    newLines: newLines.filter(line => line !== undefined),
  };
}

/**
 * Count the number of commas in a string
 * @param str - The string to count commas in
 * @returns The number of commas in the string
 */
function countCommas(str: string): number {
  const matches = str.match(/,/g);
  return matches ? matches.length : 0;
}

/**
 * Transform the data of a csv line
 * @param data - A csv line to transform
 * @returns The transformed string
 */
export function transformLineData(data: string) {
  const withoutQuotes = data.replace(/"/g, ''); // remove quotes from each csv line

  let formatted = withoutQuotes;
  const commasCount = countCommas(formatted);
  // if there are more than 1 commas, keep the first one and remove the rest (in case of the amount has thousands separator)
  // e.g. 0xaddress,1,000,000 -> 0xaddress,1000000
  if (commasCount > 1) {
    formatted = formatted.replace(/(\d),(?=\d{3}(\.|,|$))/g, '$1');
  }

  return formatted;
}

export const decimalPlaces = (value: string): number => {
  const decimals = value.split('.')[1];
  return decimals ? decimals.length : 0;
};

export const getErrorMessage = (err: any) => {
  if (err?.includes('insufficient funds') || err?.message?.includes('insufficient funds')) {
    return 'Insufficient balance to cover the gas fee.';
  } else if (err?.includes('User rejected') || err?.message?.includes('User rejected')) {
    return 'You have rejected the transaction.';
  } else {
    return 'Something went wrong!';
  }
};

export const getChainNameFromChainId = (chainId: number) => {
  return MAPPING_CHAIN_ID[chainId as keyof typeof MAPPING_CHAIN_ID];
};

export const denormalizeValue = (value: string, decimals = 0) => parseUnits(value, decimals).toString();

export const normalizeValue = (value: bigint | string = '0', decimals = 0) => {
  try {
    return formatUnits(BigInt(value), decimals);
  } catch (e) {
    console.error(e);
    return '0';
  }
};
