'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
          <Image src="/assets/icons/left-arrow-icon.svg" alt="Left Arrow Icon" width={20} height={20} />
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
  color: '#6B7684',
  fontSize: '16px',
  lineHeight: '20px',
  fontFamily: 'Pretendard',
  fontWeight: '600',
});

export default Header;
