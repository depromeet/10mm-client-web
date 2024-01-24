import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMissions } from '@/apis/mission';
import { type MissionItemTypeWithRecordId, MissionStatus } from '@/apis/schema/mission';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { ROUTER } from '@/constants/router';
import { getProgressMissionIdToStorage } from '@/utils/storage/progressMission';

export const useMissions = () => {
  const { data, isLoading } = useGetMissions();
  const missionList = data ?? [];

  const { progressMissionId } = useLeaveMissionCheck();
  useRequireMission(data);

  return { missionList, isLoading, progressMissionId };
};

// `진행중` 스톱워치 부분에서 예기치 못하게 종료된 미션 기록 확인
const useLeaveMissionCheck = () => {
  const router = useRouter();
  const { triggerSnackBar } = useSnackBar();

  const [progressMissionId, setProgressMissionId] = useState<string | null>(null);

  const checkLeaveMission = () => {
    const missionId = getProgressMissionIdToStorage();
    if (missionId) {
      setProgressMissionId(missionId);
      triggerSnackBar({
        variant: 'text-button',
        message: '미션을 완료해 주세요!',
        buttonText: '바로가기',
        offset: 'appBar',
        onButtonClick: () => {
          router.push(ROUTER.MISSION.STOP_WATCH(missionId));
        },
      });
    }
  };

  useEffect(() => {
    checkLeaveMission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { progressMissionId };
};

// `인증 필요` 미션 임시 인증만 진행, 미션 인증을 진행하지 않은 경우
const useRequireMission = (missionList?: MissionItemTypeWithRecordId[]) => {
  const router = useRouter();
  const { triggerSnackBar } = useSnackBar();

  const triggerRequireSnackBar = (requireMission: MissionItemTypeWithRecordId) => {
    const timeGapSeconds = _getTimeGapSeconds(requireMission.ttlFinishedAt);
    triggerSnackBar({
      variant: 'text-button',
      message: '인증을 완료해 주세요!',
      buttonText: '바로가기',
      offset: 'appBar',
      timerSecond: timeGapSeconds, // TODO : 서버에서 주는 데이터로 추가 필요
      onButtonClick: () => {
        router.push(ROUTER.RECORD.CREATE(String(requireMission.missionRecordId)));
      },
    });
  };

  const checkRequireRecordMission = () => {
    if (!missionList) return;
    const requireMission = missionList.find((mission) => mission.missionStatus === MissionStatus.REQUIRED);

    if (!requireMission || !requireMission.missionRecordId) return false;
    triggerRequireSnackBar(requireMission);
  };

  // TODO : 인증이 필요한 미션 정보 API 연결 (남아있는 시간 등)

  useEffect(() => {
    checkRequireRecordMission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionList]);
};

const _getTimeGapSeconds = (ttlFinishedAt: string) => {
  const currentDate = new Date();
  const missionDate = new Date(ttlFinishedAt);

  const timeGapSeconds = (missionDate.getTime() - currentDate.getTime()) / 1000;
  return Math.floor(timeGapSeconds);
};
