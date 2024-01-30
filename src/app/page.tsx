'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loading } from 'src/components/Loader';
import { useAuthContext } from 'src/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const auth = useAuthContext();

  useEffect(() => {
    if (auth.is === 'authenticated') {
      router.push('/dashboard');
    }

    if (auth.is === 'unauthenticated') {
      router.push('/login');
    }
  }, [auth.is, router]);

  return <Loading fullScreen />;
}
