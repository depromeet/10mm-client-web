import Image from 'next/image';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function AppBar() {
  return (
    <>
      <header className={headerCss}>
        <div className={logoWrapperCss}>
          <Image src={'/assets/10mm-logo.svg'} alt="10MM" width={68} height={20} />
        </div>
        <div>
          <Icon name="alarm" />
        </div>
      </header>
      <div className={blankCss} />
    </>
  );
}

export default AppBar;

const headerCss = flex({
  height: '44px',
  alignItems: 'center',
  padding: '0 8px',
  justifyContent: 'space-between',
  backgroundColor: 'bg.surface2',

  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const blankCss = css({ height: '44px' });

const logoWrapperCss = css({
  padding: '12px 6px',
});
