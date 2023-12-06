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
  height: '40px;',
  width: '100%',
};

const wrapperCss = flex({
  width: '100%',

  padding: '10px 16px',
  gap: '6px',
  background: 'transparent',
  position: 'fixed',
  margin: '0 auto',
  zIndex: 100,
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
