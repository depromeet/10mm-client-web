import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MISSION_APIS from '@/apis/mission';
import RECORD_API from '@/apis/record';
import { MissionStatus } from '@/apis/schema/mission';
import MissionCalendar from '@/app/mission/[id]/detail/MissionCalender/MissionCalendar';
import MissionHistoryBannerApi from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBannerApi';
import MissionHistorySkeleton from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistorySkeleton';
import Button from '@/components/Button/Button';
import Dialog from '@/components/Dialog/Dialog';
import { ROUTER } from '@/constants/router';
import useModal from '@/hooks/useModal';
import { checkIsExistProgressMission, removeProgressMissionData } from '@/utils/storage/progressMission';
import { css } from '@styled-system/css';

function MissionHistoryTab(props: { isCompeteMission: boolean }) {
  const { id } = useParams();
  const router = useRouter();
  const missionId = id as string;
  const currentDate = new Date();

  const { isOpen, openModal, closeModal } = useModal();
  const { isProgress, isLoading } = useCheckMissionProgress(missionId);

  const isButtonDisabled = props.isCompeteMission || isLoading;

  const checkMissionStart = async () => {
    if (!missionId) return;
    // 이미 완료한 미션인지?
    if (isProgress !== 'none') {
      openModal();
      return;
    }
    onMissionStart();
  };

  const onMissionRecordDelete = () => {
    if (!missionId) return;
    if (isProgress === 'record_required') {
      RECORD_API.deleteInProgressRecord();
      return;
    }
    if (isProgress === 'progress') {
      removeProgressMissionData();
      return;
    }
  };

  const onMissionStart = () => {
    if (!missionId) return;
    router.replace(ROUTER.MISSION.STOP_WATCH(missionId));
  };

  return (
    <div className={scrollAreaCss}>
      <div className={missionHistoryTabCss}>
        <Suspense fallback={<MissionHistorySkeleton />}>
          {missionId && <MissionHistoryBannerApi missionId={missionId} />}
        </Suspense>
        <Suspense>
          <MissionCalendar currentDate={currentDate} missionId={Number(missionId)} />
        </Suspense>
      </div>
      <div className={bottomDimCss}>
        <Button
          size={'medium'}
          variant={'cta'}
          className={buttonCss}
          onClick={checkMissionStart}
          disabled={isButtonDisabled}
        >
          미션 시작하기
        </Button>
      </div>
      <CheckProgressMissionDialog
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={() => {
          onMissionRecordDelete();
          onMissionStart();
        }}
      />
    </div>
  );
}

export default MissionHistoryTab;

interface DialogProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
}

// 다른 미션이 진행중 or 인증필요 일때
function CheckProgressMissionDialog({ onConfirm, ...props }: DialogProps) {
  const _onConfirm = () => {
    // TODO: 진행중 미션 제거 , 새로운 미션 시작

    // TODO : 인증 필요 미션 체크
    onConfirm();
  };
  return (
    <Dialog
      variant={'default'}
      title="이미 진행 중인 미션이 있어요."
      content="새로운 미션을 시작할 경우 기존에 진행 중이던 미션 기록이 사라집니다."
      confirmText="시작하기"
      cancelText="취소"
      onConfirm={_onConfirm}
      {...props}
    />
  );
}

type MissionProgressType = 'progress' | 'record_required' | 'none';

const useCheckMissionProgress = (missionId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const isProgress = useRef<MissionProgressType>('none');

  useEffect(() => {
    const _checkProgress = async () => {
      const isProgressingMissionExist = checkIsExistProgressMission(missionId);
      if (isProgressingMissionExist) {
        isProgress.current = 'progress';
        return;
      }
      const isRecordRequiredMissionExist = await checkMissionRecordRequired();
      if (isRecordRequiredMissionExist) {
        isProgress.current = 'record_required';
      }
    };
    _checkProgress().then(() => {
      setIsLoading(false);
    });
  }, []);

  return { isProgress: isProgress.current, isLoading };
};

// 인증 필요 미션 체크
const checkMissionRecordRequired = async () => {
  const missionList = await MISSION_APIS.getMissions();
  const requiredMission = missionList.find((mission) => mission.missionStatus === MissionStatus.REQUIRED);
  return Boolean(requiredMission);
};

const scrollAreaCss = css({
  overflowY: 'scroll',
  height: 'calc(100vh - 24px - 44px)',
  _scrollbar: {
    display: 'none',
  },
});

const buttonCss = css({
  position: 'relative',
  left: '0',
});

const bottomDimCss = css({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor:
    'linear-gradient(180deg, rgba(24, 24, 29, 0.00) 0%, rgba(24, 24, 29, 0.09) 7.58%, rgba(24, 24, 29, 0.59) 34.59%, rgba(24, 24, 29, 0.69) 41.18%, rgba(24, 24, 29, 0.83) 51.39%, #18181D 63.25%)',
  width: '100%',
  maxWidth: 'maxWidth',
  height: '166px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
});

const missionHistoryTabCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '24px 16px 172px 16px',
});
