'use client';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { eventLogger } from '@/utils';

function AppBar() {
  const handleSearchClick = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.HEADER, EVENT_LOG_NAME.HEADER.CLICK_SEARCH_BUTTON);
  };
  return (
    <>
      <header className={headerCss}>
        <div className={logoWrapperCss}>
          <Image src={'/assets/10mm-logo.svg'} alt="10MM" width={68} height={20} />
        </div>
        <Link className={searchIconWrapper} href={ROUTER.SEARCH.HOME} passHref onClick={handleSearchClick}>
          <Icon name="navigation-search" size={24} color="icon.secondary" />
        </Link>
      </header>
      <div className={blankCss} />
    </>
  );
}

export default AppBar;

const headerCss = flex({
  maxWidth: 'maxWidth',
  height: '44px',
  alignItems: 'center',
  padding: '0 8px',
  justifyContent: 'space-between',
  backgroundColor: 'bg.surface2',
  zIndex: 'appBar',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const searchIconWrapper = css({
  padding: '8px',
});

const blankCss = css({ height: '44px' });

const logoWrapperCss = css({
  padding: '12px 6px',
});
