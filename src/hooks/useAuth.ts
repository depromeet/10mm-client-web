import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTER } from '@/constants/router';

const ALLOW_PATH_LIST = [
  ROUTER.AUTH.LOGIN,
  ROUTER.AUTH.SIGNUP,
  ROUTER.AUTH.SIGNIN,
  ROUTER.AUTH.NICKNAME,
  ROUTER.AUTH.TEMP_REGISTER,
  ROUTER.AUTH.REGISTER,
  ROUTER.GUEST.MISSION.NEW,
  ROUTER.GUEST.MISSION.SUCCESS,
  ROUTER.GUEST.MISSION.STOP_WATCH,
  ROUTER.PRIVACY,
];

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token && !ALLOW_PATH_LIST.includes(pathname)) {
      router.push(ROUTER.AUTH.LOGIN);
    }
  }, []);
}
