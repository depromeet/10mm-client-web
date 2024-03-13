'use client';

import { useEffect } from 'react';
import { type SnackBarOffset } from '@/components/SnackBar/SnackBar.types';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';

export enum GUIDE_KEY {
  ALL_FEED_OPEN = 'ALL_FEED_OPEN',
}

const GuideMessage: Record<GUIDE_KEY, string> = {
  [GUIDE_KEY.ALL_FEED_OPEN]: '상단에 전체 피드 기능이 추가되었습니다. 확인해보세요!',
};

function useShowGuide(key: GUIDE_KEY, offset?: SnackBarOffset) {
  const { triggerSnackBar } = useSnackBar();

  const showGuide = () => {
    triggerSnackBar({
      message: GuideMessage[key],
      offset,
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!key) return;
    if (localStorage.getItem(key)) return;

    showGuide();
    localStorage.setItem(key, 'true');
  }, []);
}

export default useShowGuide;
