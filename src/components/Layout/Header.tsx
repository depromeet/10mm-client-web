'use client';

import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { flex } from '@/styled-system/patterns';
import { css } from '@styled-system/css';

interface Props {
  title?: string;
}

function Header({ title }: Props) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.back();
  };

  return (
    <>
      <header className={wrapperCss}>
        <button className={buttonCss} type="button" onClick={handleButtonClick}>
          <Icon name={'arrow-back'} color={'icon.secondary'} />
        </button>
        <h2 className={headingCss}>{title}</h2>
      </header>
      <div className={css(headerBlankCss)} />
    </>
  );
}

const headerBlankCss = {
  height: '44px;',
  width: '100%',
};

const wrapperCss = flex({
  padding: '12px',
  gap: '6px',
  background: 'transparent',
  alignItems: 'center',
  position: 'fixed',
  display: 'flex',
  margin: '0 auto',
  width: '100%',
  zIndex: 100,
  height: '44px;',
  maxWidth: '475px',
});

const buttonCss = css({
  cursor: 'pointer',
});

const headingCss = css({
  textStyle: 'subtitle3',
  color: 'text.secondary',
});

export default Header;
