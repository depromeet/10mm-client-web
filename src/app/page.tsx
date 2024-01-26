'use client';
import { useState } from 'react';
import AppBar from '@/app/home/AppBar';
import ProfileContent from '@/app/home/ProfileContent';
import ProfileList from '@/app/home/ProfileList';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import BottomDim from '@/components/BottomDim/BottomDim';
import { css } from '@styled-system/css';

export interface FollowData {
  followId: number;
  nickname: string;
}

export type FollowDataState = FollowData | null;

export default function Home() {
  const [followData, setFollowData] = useState<FollowDataState>(null);

  return (
    <main className={mainCss}>
      <AppBar />
      <ProfileList selectedFollowData={followData} onChangeFollowData={setFollowData} />
      <ProfileContent selectedFollowData={followData} />
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
