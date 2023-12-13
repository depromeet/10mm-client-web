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
    </div>
  );
}

const containerCss = css({
  position: 'relative',
  width: '312px',
  height: '312px',
  borderRadius: '312px',
});

const imageWrapperCss = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: '312px',

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
