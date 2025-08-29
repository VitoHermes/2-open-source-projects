'use client';
import { privyConfig } from '@/app/configs/privy';
import { wagmiConfig } from '@/packages/backend/configs/wagmi';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ClientPrivyProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    return (
        <PrivyProvider
            key="privy-provider"
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
            config={privyConfig}
        >
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={wagmiConfig}>
                    {children}
                </WagmiProvider>
            </QueryClientProvider>
        </PrivyProvider >
    );
}
