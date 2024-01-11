'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import { ROUTER } from '@/constants/router';

function MissionRecordHeader({ recordId, missionId }: { recordId: string; missionId: string }) {
  const route = useRouter();
  const handleEditButtonClick = () => {
    route.push(
      ROUTER.MISSION.RECORD_EDIT({
        missionId,
        recordId,
      }),
    );
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
export default MissionRecordHeader;
