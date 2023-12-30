import Button from '@/components/Button/Button';
import { snackBarWrapperCss } from '@/components/SnackBar/SnackBar.styles';
import { type SnackBarTextButtonType } from '@/components/SnackBar/SnackBar.types';
import { formatMMSS } from '@/utils/time';
import { css } from '@styled-system/css';

/**
 * TextButtonSnackBar
 * @param onButtonClick - 버튼 클릭 시 실행할 함수
 * @param message - 메시지
 * @param timerSecond - 타이머를 나타낼때 사용할 시간 (초)
 * @param buttonText - 버튼 텍스트
 *
 */
function TextButtonSnackBar({ onButtonClick, message, timerSecond, buttonText }: SnackBarTextButtonType) {
  const handleTextButtonClick = () => {
    onButtonClick();
  };

  const timerText = getTimerText(timerSecond);
  return (
    <div
      className={snackBarWrapperCss({
        flexGap: 'medium',
      })}
    >
      <div className={textCss}>
        {message}
        {Boolean(timerText) && <span className={timerTextCss}>{timerText}</span>}
      </div>

      <Button variant="ghost" size="small" className={buttonCss} onClick={handleTextButtonClick}>
        {buttonText}
      </Button>
    </div>
  );
}

const getTimerText = (timer?: number) => {
  if (timer) {
    const { formattedMinutes, formattedSeconds } = formatMMSS(timer);
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  return null;
};

export default TextButtonSnackBar;

const buttonCss = css({
  padding: 0,
  height: 'fit-content',
});

const textCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '6px',
});

const timerTextCss = css({
  color: 'text.tertiary',
});
