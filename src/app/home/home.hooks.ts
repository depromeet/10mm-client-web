import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMissions } from '@/apis/mission';
import { type MissionItemType, MissionStatus } from '@/apis/schema/mission';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { ROUTER } from '@/constants/router';
import { STORAGE_KEY } from '@/constants/storage';

const INIT_SIZE = 10;

export const useMissions = () => {
  const { data, isLoading } = useGetMissions({ size: INIT_SIZE });

  const missionList = data ?? [];
  useRequireMission(missionList);
  useLeaveMissionCheck();

  return { missionList, isLoading };
};

// 스톱워치 부분에서 예기치 못하게 종료된 미션 기록 확인
const useLeaveMissionCheck = () => {
  const router = useRouter();
  const { triggerSnackBar } = useSnackBar();

  const checkLeaveMission = () => {
    const startedMissionId = localStorage.getItem(STORAGE_KEY.STOPWATCH.MISSION_ID);

    if (startedMissionId) {
      triggerSnackBar({
        variant: 'text-button',
        message: '인증을 완료해 주세요!',
        buttonText: '바로가기',
        offset: 'appBar',
        onButtonClick: () => {
          router.push(ROUTER.MISSION.STOP_WATCH(startedMissionId));
        },
      });
    }
  };

  useEffect(() => {
    checkLeaveMission();
  }, []);
};

// 미션 임시 인증만 진행, 미션 인증을 진행하지 않은 경우
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
    const requireMission = missionList.find((mission) => mission.status === MissionStatus.REQUIRED);

    if (!requireMission) return false;
    triggerRequireSnackBar();
  };

  // TODO : 인증이 필요한 미션 정보 API 연결 (남아있는 시간 등)

  useEffect(() => {
    checkRequireRecordMission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionList]);
};

// Test Data, 나중에 삭제
const MOCK_MISSION: MissionItemType = {
  missionId: 7,
  name: 'default name REQUIRED',
  content: 'default content REQUIRED',
  category: 'STUDY',
  visibility: 'ALL',
  status: 'REQUIRED',
  sort: 1,
} as MissionItemType;
