import { lusitana } from '@/app/ui/fonts';
import type { Metadata } from 'next';
import WalletCard from '@/app/ui/wallet/walletCard';

export const metadata: Metadata = {
    title: 'Wallet',
};

export default async function Page() {
    return (
        <div className="w-full flex flex-col items-center mt-8">
            <div className="flex w-full items-center justify-between mb-8">
                <h1 className={`${lusitana.className} text-2xl`}>Wallet</h1>
            </div>
            <WalletCard />
        </div>
    );
}
