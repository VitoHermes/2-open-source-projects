import { Card } from '@/app/ui/common';
import { formatNumber } from '@/app/utils/helpers';
import { DEAD_ADDRESS, NETWORK_CONFIG } from '@/packages/backend/configs/networks';
import { supportedChains } from '@/packages/backend/configs/wagmi';
import { getTokenPriceInUSD } from '@/packages/backend/utils/index';
import { type User } from '@privy-io/react-auth';
import { getBalance, readContracts } from '@wagmi/core';
import React, { useCallback, useEffect, useState } from 'react';
import { erc20Abi, formatUnits, type Hex } from 'viem';
import { useConfig } from 'wagmi';
import { TokenBalance } from './TokenBalance';

interface Props {
    user: User;
}

interface TokenInfo {
    symbol: string;
    chainName: string;
    balance: string;
    balanceInUSD: number;
}

const CACHE_KEY = 'wallet_token_info_';

const Tokens: React.FC<Props> = ({ user }) => {
    const [totalBalance, setTotalBalance] = useState<number>(0);
    const [tokenInfo, setTokenInfo] = useState<TokenInfo[]>([]);
    const config = useConfig();

    // 1. 页面加载时优先读取缓存
    useEffect(() => {
        if (!user?.wallet?.address) return;
        const cache = localStorage.getItem(CACHE_KEY + user.wallet.address);
        if (cache) {
            try {
                const parsed = JSON.parse(cache);
                setTokenInfo(parsed.tokenInfo);
                setTotalBalance(parsed.totalBalance);
            } catch { }
        }
    }, [user?.wallet?.address]);

    const getTokenBalances = useCallback(async () => {
        const data = await Promise.all(
            Object.entries(NETWORK_CONFIG)
                .filter(([chainId]) => supportedChains.some(chain => chain.id === Number(chainId)))
                .map(async ([chainId, _networkConfig]) => {
                    const tokenList = _networkConfig.contracts?.tokens
                        ?.filter(token => token.address !== DEAD_ADDRESS)
                        ?.map(token => ({
                            address: token.address,
                            abi: erc20Abi,
                            functionName: 'balanceOf',
                            args: [user?.wallet?.address],
                            chainId: Number(chainId),
                        }));

                    const [nativeBalance, tokenBalances] = await Promise.all([
                        getBalance(config, {
                            address: user?.wallet?.address as Hex,
                            chainId: Number(chainId),
                        }),
                        readContracts(config, {
                            contracts: tokenList,
                        }),
                    ]);
                    const balances = [{ result: nativeBalance.value }, ...tokenBalances];

                    return (
                        (await Promise.all(
                            balances.map(async (tokenBalance, index) => ({
                                symbol: _networkConfig?.contracts?.tokens?.[index]?.label as string,
                                balance: formatUnits(
                                    tokenBalance.result as bigint,
                                    _networkConfig?.contracts?.tokens?.[index]?.decimals as number,
                                ),
                                balanceInUSD: await getTokenPriceInUSD(
                                    _networkConfig?.contracts?.tokens?.[index]?.address as Hex,
                                    Number(chainId),
                                    tokenBalance.result as bigint,
                                    _networkConfig?.contracts?.tokens?.[index]?.decimals as number,
                                ),
                                chainName: _networkConfig?.networkName,
                            })),
                        )) ?? []
                    );
                }),
        );

        return data.flat();
    }, [config, user?.wallet?.address]);

    // 2. 拉取新数据后写入缓存
    useEffect(() => {
        if (!user?.wallet?.address) return;
        getTokenBalances().then(data => {
            setTokenInfo(data);
            const total = data.reduce((acc, token) => acc + token.balanceInUSD, 0);
            setTotalBalance(total);
            // 只有 user?.wallet?.address 存在时才写入缓存
            if (user && user.wallet && user.wallet.address) {
                localStorage.setItem(
                    CACHE_KEY + user.wallet.address,
                    JSON.stringify({ tokenInfo: data, totalBalance: total })
                );
            }
        });
    }, [getTokenBalances, user?.wallet?.address]);

    return (
        <Card>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-[16px] font-bold">Account Balance</p>
                    <p className="text-[32px]">{totalBalance === 0 ? '-' : `$${formatNumber(totalBalance, 2)}`}</p>
                </div>
            </div>

            {tokenInfo
                ?.filter(token => token.balanceInUSD > 0.01)
                ?.sort((a, b) => b.balanceInUSD - a.balanceInUSD)
                .map(token => {
                    return (
                        <TokenBalance
                            key={`${token.symbol}-${token.chainName}`}
                            symbol={token.symbol}
                            tokenBalanceValue={token.balance}
                            tokenPriceInUSD={token.balanceInUSD}
                            chainName={token.chainName}
                        />
                    );
                })}
        </Card>
    );
};

export default Tokens;
