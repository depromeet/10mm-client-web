'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import { ROUTER } from '@/constants/router';

function MissionRecordHeader({ recordId }: { recordId: string }) {
  const route = useRouter();
  const handleEditButtonClick = () => {
    route.push(ROUTER.RECORD.DETAIL.EDIT(recordId));
  };
  return (
    <Header
      rightAction="text-button"
      title={'미션 내역'}
      rightButtonText={'수정'}
      rightButtonProps={{
        onClick: handleEditButtonClick,
      }}
    />
  );
}
export default MissionRecordHeader;
