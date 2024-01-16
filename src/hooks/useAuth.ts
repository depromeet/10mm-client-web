import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTER } from '@/constants/router';

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      router.push(ROUTER.AUTH.LOGIN);
    }
  }, []);
}
