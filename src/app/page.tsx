'use client';
import AppBar from '@/pages/home/AppBar';
import FollowContent from '@/pages/home/FollowContent';
import FollowList from '@/pages/home/FollowList';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import BottomDim from '@/components/BottomDim/BottomDim';
import { css } from '@styled-system/css';

export interface FollowData {
  followId: number;
  nickname: string;
}

export type FollowDataState = FollowData | null;

export default function Home() {
  return (
    <main className={mainCss}>
      <AppBar />
      <FollowList />
      <FollowContent />
      <AppBarBottom />
      <BottomDim />
    </main>
  );
}

const mainCss = css({
  minHeight: '100vh',
  paddingBottom: '113px', // 64(app bar bottom) + 15(gap) + 34(indicator)
  display: 'flex',
  flexDirection: 'column',
});
