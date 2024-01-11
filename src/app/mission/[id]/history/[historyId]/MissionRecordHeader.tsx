'use client';
import Header from '@/components/Header/Header';

function MissionRecordHeader({ historyId, missionId }: { historyId: string; missionId: string }) {
  const handleEditButtonClick = () => {
    console.log('edit button clicked', historyId, missionId);
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
