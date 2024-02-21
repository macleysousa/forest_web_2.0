'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loading } from '../components/Loading';
import { useAuthContext } from '../contexts/AuthContext';

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

  return <Loading />;
}
