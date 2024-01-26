import { type PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';
import { css } from '@/styled-system/css';

function SearchLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header rightAction="none" title="닉네임 검색" />
      <main className={mainCss}>{children}</main>
    </>
  );
}

export default SearchLayout;

const mainCss = css({
  padding: '8px 16px',
});
