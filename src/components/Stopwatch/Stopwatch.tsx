import Image from 'next/image';
import { css } from '@/styled-system/css';

function Stopwatch() {
  return (
    <div className={containerCss}>
      <div className={imageWrapperCss}>
        <Image
          className={birCircleImageCss}
          fill
          src={'/assets/stopwatch/gradient-circle.png'}
          alt="stopwatch circle bg"
        />
        <Image
          className={smallCircleCss}
          width={24}
          height={24}
          src={'/assets/stopwatch/small-circle.svg'}
          alt="small circle"
        />
      </div>
      <div className={innerContainerCss}>
        <p className={categoryCss}>잠들기 전 오늘 하루 감사일기 쓰기</p>
        <div
          className={css(timerTextCss, {
            color: 'transparent',
            // color: isActive ? 'transparent' : '#B0B8C1',
          })}
        >
          <span>{time[0]}</span>
          <span>:</span>
          <span>{time[1]}</span>
        </div>
        </div>
      </div>
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

const categoryCss = css({ color: 'purple.purple800', textStyle: 'body2', marginBottom: '4px' });

const timerTextCss = {
  fontSize: '70px',
  fontWeight: '100',
  animation: 'gradient 3s ease-in-out infinite',
  backgroundSize: '150% 200%!',
  '-webkit-background-clip': 'text!',
  background: 'gradients.primary',

  height: '84px',
  lineHeight: '84px',
};
// background image
const imageWrapperCss = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '312px',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,

  // NOTE: circle layer하나는 css로 구현
  background: 'linear-gradient(136deg, rgba(240, 168, 198, 0.02) 15.95%, rgba(143, 169, 255, 0.02) 85.07%)',
  boxShadow: '0px 4px 40px 4px rgba(100, 78, 122, 0.80) inset, 10px 10px 100px 0px rgba(151, 155, 255, 0.07)',

  // rotate animation
  transformOrigin: '50% 50%',
  animation: 'circleRotate 60s linear infinite',
});

const smallCircleCss = css({ position: 'absolute', top: '-10px', left: 0, right: 0, margin: '0 auto' });

const birCircleImageCss = css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

export default Stopwatch;
