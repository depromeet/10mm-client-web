'use client';

import { type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { flex } from '@/styled-system/patterns';
import { css } from '@styled-system/css';

interface Props {
  title?: string;
  rightElement?: ReactNode;
}

function Header({ title, rightElement }: Props) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.back();
  };

  return (
    <>
      <header className={wrapperCss}>
        <section className={leftSectionCss}>
          <button className={backButtonCss} type="button" onClick={handleButtonClick}>
            <Icon name={'arrow-back'} color={'icon.secondary'} width={20} height={20} />
          </button>
          <h2 className={headingCss}>{title}</h2>
        </section>
        <section className={rightSectionCss}>{rightElement}</section>
      </header>
      <div className={css(positionCss)} />
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
  background: 'transparent',
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
