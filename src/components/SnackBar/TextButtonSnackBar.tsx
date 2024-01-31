import { useEffect, useState } from 'react';
import { snackBarWrapperCss } from '@/components/SnackBar/SnackBar.styles';
import { type SnackBarTextButtonType } from '@/components/SnackBar/SnackBar.types';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { formatMMSS } from '@/utils/time';
import { css } from '@styled-system/css';

/**
 * TextButtonSnackBar
 * @param onButtonClick - 버튼 클릭 시 실행할 함수
 * @param message - 메시지
 * @param timerSecond - 타이머를 나타낼때 사용할 시간 (초)
 * @param buttonText - 버튼 텍스트
 * @param id - 스낵바 아이디
 *
 */
function TextButtonSnackBar({ onButtonClick, message, timerSecond, buttonText, id }: SnackBarTextButtonType) {
  const { removeSnackBar } = useSnackBar();

  const handleTextButtonClick = () => {
    onButtonClick();
    removeSnackBar(id);
  };

  return (
    <div
      className={snackBarWrapperCss({
        flexGap: 'medium',
      })}
    >
      <div className={textCss}>
        {message}
        {timerSecond && <TimerText initSeconds={timerSecond} />}
      </div>

      <button type={'button'} className={buttonCss} onClick={handleTextButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}

const buttonCss = css({
  textStyle: 'subtitle5',
  color: 'purple.purple500',
});

const MIN_SECOND = 0;

function TimerText(props: { initSeconds: number }) {
  const [second, setSecond] = useState(props.initSeconds); // 남은 시간 (단위: 초)
  const timerText = getTimerText(second);

  useEffect(() => {
    if (second <= MIN_SECOND) {
      return;
    }

    const timer: NodeJS.Timeout = setInterval(() => {
      setSecond((prev) => (prev <= MIN_SECOND ? MIN_SECOND : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span className={timerTextCss}>{timerText}</span>;
}

const getTimerText = (timer?: number) => {
  if (timer) {
    const { formattedMinutes, formattedSeconds } = formatMMSS(timer);
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  return null;
};

export default TextButtonSnackBar;

const textCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '6px',
});

const timerTextCss = css({
  color: 'text.tertiary',
});
