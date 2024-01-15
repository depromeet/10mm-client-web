import { useEffect } from 'react';
import { useGetMissions } from '@/apis/mission';
import { type MissionItemType, MissionStatus } from '@/apis/schema/mission';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';

const INIT_SIZE = 10;

export const useMissions = () => {
  const { data, isLoading } = useGetMissions({ size: INIT_SIZE });
  const missionList = data ?? [];

  useRequireMission(data);

  return { missionList, isLoading };
};

const useRequireMission = (missionList?: MissionItemType[]) => {
  const { triggerSnackBar } = useSnackBar();

  const triggerRequireSnackBar = () => {
    triggerSnackBar({
      variant: 'text-button',
      message: '인증을 완료해 주세요!',
      buttonText: '바로가기',
      // timerSecond: 0, // TODO : 서버에서 주는 데이터로 추가 필요
      onButtonClick: () => {},
    });
  };

  const checkRequireRecordMission = () => {
    if (!missionList) return;
    const requireMission = missionList.find((mission) => mission.missionStatus === MissionStatus.REQUIRED);

    if (!requireMission) return false;
    triggerRequireSnackBar();
  };

  // TODO : 인증이 필요한 미션 정보 API 연결 (남아있는 시간 등)

  useEffect(() => {
    checkRequireRecordMission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionList]);
};
