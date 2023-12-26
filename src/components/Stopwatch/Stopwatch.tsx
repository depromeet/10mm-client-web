import Image from 'next/image';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';

interface Props {
  minutes: string;
  seconds: string;
  category: string;
  stepper: number;

  isDisabled: boolean;
  isProgress: boolean;
}

function Stopwatch({ minutes, seconds, category, stepper, isDisabled, isProgress }: Props) {
  return (
    <div className={containerCss}>
      <div
        className={css(imageWrapperCss, {
          animationPlayState: isProgress ? '' : 'paused',
          boxShadow: isDisabled
            ? '0px 4px 40px 4px rgba(60, 58, 75, 0.80) inset, 10px 10px 100px 0px rgba(160, 161, 188, 0.07)'
            : '0px 4px 40px 4px rgba(100, 78, 122, 0.80) inset, 10px 10px 100px 0px rgba(151, 155, 255, 0.07)',
        })}
      >
        <Image
          fill
          src={isDisabled ? '/assets/stopwatch/disabled-circle.png' : '/assets/stopwatch/gradient-circle.png'}
          alt="stopwatch circle bg"
          className={css(birCircleImageCss)}
        />
        <Image
          className={smallCircleCss}
          width={24}
          height={24}
          src={isDisabled ? '/assets/stopwatch/disabled-small-circle.svg' : '/assets/stopwatch/small-circle.svg'}
          alt="small circle"
        />
      </div>
      <div className={innerContainerCss}>
        <p
          className={css(categoryCss, ellipsis, {
            color: isDisabled ? 'text.tertiary' : 'purple.purple800',
          })}
        >
          {category}
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
  textStyle: 'body3',
  marginBottom: '4px',
  maxWidth: '110px',
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

// background image
const imageWrapperCss = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '312px',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,

  transition: '1s ease-in-out',
  // rotate animation
  transformOrigin: '50% 50%',
  animation: 'circleRotate 60s linear infinite',
};

const smallCircleCss = css({ position: 'absolute', top: '-10px', left: 0, right: 0, margin: '0 auto' });

const birCircleImageCss = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export default Stopwatch;
