import { type PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';

function LevelGuideLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header rightAction="none" title="내 레벨" />
      {children}
    </>
  );
}

export default LevelGuideLayout;
