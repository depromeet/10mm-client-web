import Image from 'next/image';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function AppBar() {
  return (
    <div>
      <header className={headerCss}>
        <div className={logoWrapperCss}>
          <Image src={'/assets/10mm-logo.svg'} alt="10MM" width={68} height={20} />
        </div>
        <div>
          <Icon name="alarm" />
        </div>
      </header>
    </div>
  );
}

export default AppBar;

const headerCss = flex({
  height: '44px',
  alignItems: 'center',
  padding: '0 8px',
  justifyContent: 'space-between',
  //   backgroundColor: 'bg.surface2',
});

const logoWrapperCss = css({
  padding: '12px 6px',
});
