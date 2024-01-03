'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import { ROUTER } from '@/constants/router';

function MissionHistoryPageHeader() {
  const router = useRouter();

  const handleEditButtonClick = () => {
    router.push(ROUTER.MISSION.HISTORY_EDIT('12', '12'));
  };

  return (
    <Header
      rightAction="text-button"
      title={'미션 내역'}
      rightButtonText={'수정'}
      onButtonClick={handleEditButtonClick}
    />
  );
}

export default MissionHistoryPageHeader;
