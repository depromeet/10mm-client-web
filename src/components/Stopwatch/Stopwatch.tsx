import Icon from '@/components/Icon';
import StopwatchContainer from '@/components/Stopwatch/StopwatchContainer';
import { css } from '@/styled-system/css';

interface Props {
  minutes: string;
  seconds: string;
  stepper: number;
  missionName: string;
  isDisabled: boolean;
  isProgress: boolean;
}

function Stopwatch({ minutes, seconds, missionName, stepper, isDisabled, isProgress }: Props) {
  return (
    <div className={containerCss}>
      <StopwatchContainer isPaused={!isProgress} />
      <div className={innerContainerCss}>
        <p
          className={css(categoryCss, ellipsis, {
            color: isDisabled ? 'text.tertiary' : 'purple.purple800',
          })}
          key={missionName}
        >
          {missionName}
        </p>
        <div
          className={css(timeTextCss, {
            color: isDisabled ? 'text.tertiary' : 'transparent',
          })}
        >
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </div>
        <LightningStepper stack={stepper} isDisabled={isDisabled} />
      </div>
    </div>
  );
}

function LightningStepper({ stack, isDisabled }: { stack: number; isDisabled: boolean }) {
  return (
    <div className={lightingWrapperCss}>
      {[...Array(stack)].map((_, idx) => (
        <Icon
          key={idx}
          name="10mm-symbol"
          color={isDisabled ? 'icon.secondary' : 'purple.purple700'}
          width={16}
          height={16}
        />
      ))}
      {[...Array(6 - stack)].map((_, idx) => (
        <Icon
          key={idx}
          name="10mm-symbol"
          color={isDisabled ? 'gray.gray300' : 'purple.purple100'}
          width={16}
          height={16}
        />
      ))}
    </div>
  );
}

const containerCss = css({
  position: 'relative',
  width: '312px',
  height: '312px',
  borderRadius: '312px',
  color: 'white',
  margin: 'auto',
});

const innerContainerCss = css({
  padding: '74px 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  position: 'relative',
  zIndex: 1,
});

const categoryCss = {
  textAlign: 'center',
  textStyle: 'body4',
  marginBottom: '4px',
  maxWidth: '110px',
  minHeight: '20px',
  animation: 'fadeIn .7s',
};

const ellipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
};

const timeTextCss = {
  fontSize: '70px',
  fontWeight: '100',
  animation: 'gradient 3s ease-in-out infinite',
  backgroundSize: '150% 200%!',
  '-webkit-background-clip': 'text!',
  background: 'gradients.primary',

  height: '84px',
  lineHeight: '84px',
};

const lightingWrapperCss = css({ display: 'flex', gap: '5px', marginTop: '12px' });

export default Stopwatch;
