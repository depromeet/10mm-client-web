import { useEffect } from 'react';
import { useGetMissions } from '@/apis/mission';
import { type MissionItemType, MissionStatus } from '@/apis/schema/mission';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';

const INIT_SIZE = 10;

export const useMissions = () => {
  const { data, isLoading } = useGetMissions({ size: INIT_SIZE });
  console.log('data: ', data);
  const missionList = data?.content ?? [];

  useRequireMission(data?.content);

  return { missionList, isLoading };
};

const useRequireMission = (missionList?: MissionItemType[]) => {
  const { triggerSnackBar } = useSnackBar();

  const triggerRequireSnackBar = () => {
    triggerSnackBar({
      variant: 'text-button',
      message: 'SnackBar',
      buttonText: 'Button',
      timerSecond: 100,
      onButtonClick: () => {},
    });
  };

  const checkRequireRecordMission = () => {
    if (!missionList) return;
    const requireMission = missionList.find((mission) => mission.status === MissionStatus.REQUIRED);

    // if (!requireMission) return false;
    triggerRequireSnackBar();
  };

  // TODO : 인증이 필요한 미션 정보 API 연결 (남아있는 시간 등)

  useEffect(() => {
    checkRequireRecordMission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionList]);
};

const MOCK_MISSION: MissionItemType = {
  missionId: 7,
  name: 'default name REQUIRED',
  content: 'default content REQUIRED',
  category: 'STUDY',
  visibility: 'ALL',
  status: 'REQUIRED',
  sort: 1,
} as MissionItemType;
