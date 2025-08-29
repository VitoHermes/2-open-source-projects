'use client';
import { lusitana } from '@/app/ui/fonts';
import { useLogin, usePrivy } from '@privy-io/react-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrlRaw = searchParams.get('callbackUrl');
  const callbackUrl = callbackUrlRaw && callbackUrlRaw.startsWith('/')
    ? callbackUrlRaw
    : '/dashboard';

  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      if (window.location.pathname !== callbackUrl) {
        router.replace(callbackUrl);
      }
    }
  }, [ready, authenticated, callbackUrl, router]);

  const handlePrivyLogin = () => {
    if (authenticated) {
      router.replace(callbackUrl);
    } else {
      setLoading(true);
      login();
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>Please log in to continue</h1>
        <p className="text-sm text-gray-600 mb-6">
          Use Privy for secure one-click login with wallet, email, SMS and more
        </p>

        <button
          type="button"
          onClick={handlePrivyLogin}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 font-medium"
        >
          {loading ? 'Logging in...' : authenticated ? 'Click to enter' : 'Login'}
        </button>

        {authenticated && (
          <p className="text-sm text-green-600 mt-2 text-center">
            Login successful, redirecting...
          </p>
        )}
      </div>
    </div>
  );
}
