'use client';

import { useRouter } from 'next/navigation';
import { type HeaderType } from '@/components/Header/Header.types';
import IconHeader from '@/components/Header/IconHeader';
import IconMenuHeader from '@/components/Header/IconMenuHeader';
import NoneHeader from '@/components/Header/NoneHeader';
import TextButtonHeader from '@/components/Header/TextButtonHeader';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { eventLogger } from '@/utils';

function Header({ onBackAction, isBackIcon = true, ...props }: HeaderType) {
  const router = useRouter();

  const handleBackIconClick = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.HEADER.CLICK_BACK_BUTTON, EVENT_LOG_CATEGORY.HEADER);
    if (isBackIcon) {
      onBackAction ? onBackAction() : router.back();
      return;
    }
  };

  // TODO : 리팩토링 하기
  switch (props.rightAction) {
    case 'icon':
      return <IconHeader onBackAction={isBackIcon ? handleBackIconClick : undefined} {...props} />;
    case 'none':
      return <NoneHeader onBackAction={isBackIcon ? handleBackIconClick : undefined} {...props} />;
    case 'text-button':
      return <TextButtonHeader onBackAction={isBackIcon ? handleBackIconClick : undefined} {...props} />;
    case 'icon-menu':
      return <IconMenuHeader onBackAction={isBackIcon ? handleBackIconClick : undefined} {...props} />;
  }
}

export default Header;
