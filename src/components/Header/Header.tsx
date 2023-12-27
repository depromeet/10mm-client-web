'use client';

import { useRouter } from 'next/navigation';
import { type HeaderType } from '@/components/Header/Header.types';
import IconHeader from '@/components/Header/IconHeader';
import NoneHeader from '@/components/Header/NoneHeader';
import TextButtonHeader from '@/components/Header/TextButtonHeader';
import { eventLogger } from '@/utils';

function Header({ onBackAction, isBackIcon = true, ...props }: HeaderType) {
  const router = useRouter();

  const handleBackIconClick = () => {
    eventLogger.logEvent('click/backButton', 'header');
    if (isBackIcon) {
      onBackAction ? onBackAction() : router.back();
      return;
    }
  };

  switch (props.rightAction) {
    case 'icon':
      return <IconHeader onBackAction={handleBackIconClick} {...props} />;
    case 'none':
      return <NoneHeader onBackAction={handleBackIconClick} {...props} />;
    case 'text-button':
      return <TextButtonHeader onBackAction={handleBackIconClick} {...props} />;
  }
}

export default Header;
