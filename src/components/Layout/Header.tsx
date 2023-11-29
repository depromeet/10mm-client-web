import Image from 'next/image';
import { flex } from '@/styled-system/patterns';
import { css } from '@styled-system/css';

interface Props {
  title?: string;
}

function Header({ title }: Props) {
  return (
    <div className={wrapperCss}>
      <button type="button">
        <Image src="/assets/icons/left-arrow-icon.svg" alt="Left Arrow Icon" width={20} height={20} />
      </button>
      <h2 className={headingCss}>{title}</h2>
    </div>
  );
}

const wrapperCss = flex({
  padding: '10px 16px',
  gap: '6px',
});

const headingCss = css({
  color: '#6B7684',
  fontSize: '16px',
  fontFamily: 'Pretendard',
  fontWeight: '600',
});

export default Header;
