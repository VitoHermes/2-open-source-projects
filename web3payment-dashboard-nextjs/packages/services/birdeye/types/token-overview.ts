interface TokenExtensions {
  description?: string;
  coingeckoId?: string;
  twitter?: string;
  website?: string;
  discord?: string;
  telegram?: string;
}

export interface TokenOverview {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  extensions: TokenExtensions;
  logoURI: string;
  liquidity: number;
  lastTradeUnixTime: number;
  lastTradeHumanTime: string;
  price: number;
  supply: number;
  marketCap: number;
  circulatingSupply: number;
  realMc: number;
  holder: number;
  numberMarkets: number;

  // Price changes
  history30mPrice: number;
  priceChange30mPercent: number;
  history1hPrice: number;
  priceChange1hPercent: number;
  history2hPrice: number;
  priceChange2hPercent: number;
  history4hPrice: number;
  priceChange4hPercent: number;
  history6hPrice: number;
  priceChange6hPercent: number;
  history8hPrice: number;
  priceChange8hPercent: number;
  history12hPrice: number;
  priceChange12hPercent: number;
  history24hPrice: number;
  priceChange24hPercent: number;

  // Trading metrics for different time periods
  // 30m
  trade30m: number;
  v30m: number;
  v30mUSD: number;
  buy30m: number;
  sell30m: number;
  vBuy30m: number;
  vBuy30mUSD: number;
  vSell30m: number;
  vSell30mUSD: number;

  // 1h
  trade1h: number;
  v1h: number;
  v1hUSD: number;
  buy1h: number;
  sell1h: number;
  vBuy1h: number;
  vBuy1hUSD: number;
  vSell1h: number;
  vSell1hUSD: number;

  // 24h
  trade24h: number;
  v24h: number;
  v24hUSD: number;
  buy24h: number;
  sell24h: number;
  vBuy24h: number;
  vBuy24hUSD: number;
  vSell24h: number;
  vSell24hUSD: number;

  // Unique wallets
  uniqueWallet30m: number;
  uniqueWallet1h: number;
  uniqueWallet2h: number;
  uniqueWallet4h: number;
  uniqueWallet8h: number;
  uniqueWallet24h: number;

  total_supply?: number;
  circulating_supply?: number;
  volume_change_24h?: number;
  cmc_rank?: number;
  max_supply?: number;
  fully_diluted_market_cap?: number;
  // QuillAI
}
