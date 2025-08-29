import { formatNumber } from '@/app/utils/helpers';
import Image from 'next/image';

export const TokenBalance = ({
  symbol,
  tokenBalanceValue,
  tokenPriceInUSD,
  chainName,
}: {
  symbol: string;
  tokenBalanceValue: string;
  tokenPriceInUSD: number;
  chainName: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Image src={`/token-icons/${symbol.toLowerCase()}.png`} alt={symbol} width={32} height={32} />
        <div className="flex flex-col">
          <p className="text-[16px] font-bold">{symbol}</p>
          <p className="text-[12px] text-[#686E81]">{chainName}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-[16px] font-bold">{`${tokenPriceInUSD > 0 ? '$' : ''}${formatNumber(tokenPriceInUSD)}`}</p>
        <p className="text-[12px] text-[#686E81]">{formatNumber(tokenBalanceValue, 6)}</p>
      </div>
    </div>
  );
};
