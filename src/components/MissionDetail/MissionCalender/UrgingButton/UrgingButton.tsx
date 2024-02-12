import { useNotifyUrging } from '@/apis/notifications';
import { UrgingStatus } from '@/apis/record';
import GradientPaperAirplaneIcon from '@/components/MissionDetail/MissionCalender/UrgingButton/GradientPaperAirplaneIcon';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { gradientBorderWrapperCss, gradientTextCss } from '@/constants/style/gradient';
import { css, cx } from '@/styled-system/css';

interface Props {
  missionId: number;
  urgingStatus: UrgingStatus;
}

function UrgingButton(props: Props) {
  const { triggerSnackBar } = useSnackBar();

  const { mutate, isSuccess, isPending } = useNotifyUrging({
    onSuccess: () => {
      triggerSnackBar({
        message: '재촉 알림을 보냈어요!',
      });
    },
  });

  const isVisible = props.urgingStatus === UrgingStatus.URGING;

  const onClick = () => {
    mutate({ missionId: props.missionId });
  };

  if (!isVisible || isSuccess) {
    return null;
  }

  return (
    <button type="button" className={cx(buttonCss, gradientBorderWrapperCss())} disabled={isPending} onClick={onClick}>
      <div className={innerCss}>
        <GradientPaperAirplaneIcon size={16} />
        <span className={gradientTextCss}>미션 재촉하기</span>
      </div>
    </button>
  );
}

export default UrgingButton;

const buttonCss = css({
  position: 'fixed',
  bottom: '16px',
  left: 0,
  right: 0,
  margin: 'auto',
  width: 'fit-content',
  zIndex: 100,
  borderRadius: '16px',
  cursor: 'pointer',

  '&:disabled': {
    cursor: 'not-allowed',
    filter: 'brightness(0.4)',
  },
});

const innerCss = css({
  height: '42px',
  alignItems: 'center',
  padding: '0 16px',
  display: 'flex',
  gap: '6px',
  textStyle: 'body1',
});
