'use client';

import { PowerIcon } from '@heroicons/react/24/outline';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
    const { authenticated, logout } = usePrivy();
    const router = useRouter();

    const handleSignOut = async () => {
        if (authenticated) {
            await logout();
        }
        router.replace('/');
    };

    return (
        <button
            onClick={handleSignOut}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Log out</div>
        </button>
    );
}
