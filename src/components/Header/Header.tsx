'use client';

import { type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { flex } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';
import { eventTracker } from '@/utils';
import { css } from '@styled-system/css';

interface Props {
  title?: string;
  rightElement?: ReactNode;
  onBackAction?: () => void;
  isBackgroundTransparent?: boolean;
}

/**
 * @description Header 컴포넌트
 * @param title header title text
 * @param rightElement header 오른쪽에 들어가는 element
 * @param onBackAction back icon click action
 * @param isBackgroundTransparent header background color가 바텀시트에서 쓰일때는 투명이어야 함
 */
function Header({ title, rightElement, onBackAction, isBackgroundTransparent = false }: Props) {
  const router = useRouter();

  const handleBackIconClick = () => {
    eventTracker.logEvent('click/backButton', 'header');
    onBackAction ? onBackAction() : router.back();
  };

  return (
    <>
      <header
        className={wrapperCss}
        style={{
          // panda쪽에서 다이나믹하게 하고 싶은데 일단 아래로 처리
          backgroundColor: isBackgroundTransparent ? 'transparent' : token.var('colors.bg.surface1'),
        }}
      >
        <section className={leftSectionCss}>
          <button className={`${backButtonCss} back-button`} type="button" onClick={handleBackIconClick}>
            <Icon name={'arrow-back'} color={'icon.secondary'} width={20} height={20} />
          </button>
          <h2 className={headingCss}>{title}</h2>
        </section>
        <section className={rightSectionCss}>{rightElement}</section>
      </header>
      <article className={css(positionCss)} />
    </>
  );
}

const positionCss = {
  height: '44px;',
  width: '100%',
  maxWidth: '475px',
};

const wrapperCss = flex({
  ...positionCss,
  padding: '12px',
  background: 'bg.surface1',
  margin: '0 auto',
  left: 0,
  right: 0,
  top: 0,
  zIndex: 100,
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const leftSectionCss = css({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  flex: 1,
});

const rightSectionCss = css({});

const backButtonCss = css({
  cursor: 'pointer',
});

const headingCss = css({
  textStyle: 'subtitle3',
  color: 'text.secondary',
});

export default Header;
