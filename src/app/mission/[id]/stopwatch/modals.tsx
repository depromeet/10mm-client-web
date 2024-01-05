import Dialog from '@/components/Dialog/Dialog';
import { eventLogger } from '@/utils';

interface DialogProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
  logData?: Record<string, string | number>;
}

export function FinalDialog({ onConfirm, logData, ...props }: DialogProps) {
  const _onConfirm = () => {
    logData && eventLogger.logEvent('click/finish', 'stopwatch');
    onConfirm();
  };
  return (
    <Dialog
      variant={'default'}
      title="미션을 끝내시겠어요?"
      content="지금까지 집중한 시간들이 기록됩니다."
      confirmText="끝내기"
      cancelText="취소"
      onConfirm={_onConfirm}
      {...props}
    />
  );
}

export function BackDialog(props: DialogProps) {
  return (
    <Dialog
      variant={'default'}
      title="잠깐! 정말 나가시겠어요?"
      content="끝내기 버튼을 누르지 않으면 지금까지 집중한 시간들이 사라져요."
      confirmText="나가기"
      cancelText="취소"
      {...props}
    />
  );
}

export function MidOutDialog(props: DialogProps) {
  return (
    <Dialog
      variant={'default'}
      title="미션을 끝내시겠어요?"
      content="10분을 채우지 않으면 오늘의 미션을 완료할 수 없어요."
      confirmText="나가기"
      cancelText="끝내기"
      {...props}
    />
  );
}
