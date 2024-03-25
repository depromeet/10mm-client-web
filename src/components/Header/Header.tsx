import { useRouter } from 'next/router';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { eventLogger } from '@/utils';

import { type HeaderType } from './Header.types';
import HeaderBase from './HeaderBase';
import IconHeader from './IconHeader';
import IconMenuHeader from './IconMenuHeader';
import NoneHeader from './NoneHeader';
import RightComponentHeader from './RightComponentHeader';
import TextButtonHeader from './TextButtonHeader';

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
    case 'component':
      return <RightComponentHeader onBackAction={isBackIcon ? handleBackIconClick : undefined} {...props} />;
    case 'icon-menu':
      return <IconMenuHeader onBackAction={isBackIcon ? handleBackIconClick : undefined} {...props} />;
    default:
      return <HeaderBase onBackAction={isBackIcon ? handleBackIconClick : undefined} {...props} />;
  }
}

export default Header;
