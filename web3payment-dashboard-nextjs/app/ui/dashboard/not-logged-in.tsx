'use client';

import { usePrivy } from '@privy-io/react-auth';
import React from 'react';
import { useRouter } from 'next/navigation';

const NotLoggedIn: React.FC = () => {
  const { user } = usePrivy();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  return null;
};

export default NotLoggedIn;
