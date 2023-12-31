'use client';

import Header from '@/components/Header/Header';
import { css } from '@styled-system/css';

export default function MissionDetailPage() {
  const handleIconClick = () => {
    // TODO: 메뉴 열기
  };

  return (
    <main className={mainWrapperCss}>
      <Header title={'미션 상세'} rightAction="icon" iconName={'menu'} onIconClick={handleIconClick} />
      <div className={containerCss}></div>
    </main>
  );
}

const mainWrapperCss = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
});

const containerCss = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  padding: '24px 16px',
});
