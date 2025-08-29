'use client'
import NotLoggedIn from '@/app/ui/dashboard/not-logged-in';
import { usePrivy } from '@privy-io/react-auth';
import { QRCodeSVG } from 'qrcode.react';
import Address from './Address';
import Tokens from './balance';

export default function WalletCard() {
    const { user } = usePrivy();
    console.log(user);
    const walletAddress = user?.wallet?.address || '';
    const qrCodeValue = `ethereum:${walletAddress}`;
    if (!user) return <NotLoggedIn />;

    return (
        <div className="w-full flex flex-row justify-start items-start max-w-3xl">
            <div className="w-[80%] bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 flex flex-col border border-gray-100 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-lg font-semibold text-blue-700 tracking-wide">USDT Wallet</span>
                </div>
                <div className="text-gray-500 text-xs mb-1">Balance</div>
                <Tokens user={user} />
                <div className="flex flex-col items-center mb-6 w-full">
                    <div className="text-xs text-gray-400 mb-1 mt-5 self-start">Address</div>
                    <div className="flex items-center gap-2 mb-3 w-full">
                        <Address address={walletAddress} />
                    </div>
                    <div className="flex gap-10 p-2 rounded-xl border border-gray-100">
                        <QRCodeSVG value={qrCodeValue} size={150} />
                        <div className="flex flex-col gap-4 w-full justify-center mt-2">
                            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-8 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Deposit</button>
                            <button className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-8 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">Transfer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
