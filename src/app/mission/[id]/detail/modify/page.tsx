'use client';

import Header from '@/components/Header/Header';
import { css } from '@styled-system/css';

import MissionModify from './MissionModify';

export default function MissionModifyPage() {
  // const handleIconClick = () => {
  //   // TODO: 메뉴 열기
  // };

  return (
    <main className={mainWrapperCss}>
      <Header rightAction="text-button" title={'미션 수정'} rightButtonText={'저장'} />
      <div className={containerCss}>
        <MissionModify />
      </div>
    </main>
  );
}

const mainWrapperCss = css({
  height: '100vh',
  width: '100%',
  overflowY: 'hidden',
});

const containerCss = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  padding: '24px 16px',
});
