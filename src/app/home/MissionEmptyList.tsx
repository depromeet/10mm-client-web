import { useRouter } from 'next/navigation';
import Empty from '@/components/Empty/Empty';
import { ROUTER } from '@/constants/router';
import { flex } from '@styled-system/patterns';

function MissionEmptyList() {
  const router = useRouter();

  const handleMissionRegister = () => {
    router.push(ROUTER.MISSION.NEW);
  };

  return (
    <div className={containerCss}>
      <Empty
        type="suggest"
        title={'아직 등록된 미션이 없어요.'}
        buttonText={'미션 등록하기'}
        buttonAction={handleMissionRegister}
        description={'미션을 등록하고 습관을 형성해 보세요!'}
        image={'docs'}
      />
    </div>
  );
}

export default MissionEmptyList;

const containerCss = flex({ flex: 1, justifyContent: 'center', alignItems: 'center' });