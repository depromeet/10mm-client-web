import { type PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';
import { css } from '@/styled-system/css';

function LevelGuideLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header rightAction="none" title="내 레벨" />
      <main className={containerCss}>{children}</main>
    </>
  );
}

export default LevelGuideLayout;

const containerCss = css({
  minHeight: '720px',
});
