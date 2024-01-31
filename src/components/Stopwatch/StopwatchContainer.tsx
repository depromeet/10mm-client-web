import { css, cx } from '@/styled-system/css';

function StopwatchContainer({ isPaused }: { isPaused?: boolean }) {
  const animationCss = css({
    animationPlayState: isPaused ? 'paused !' : '',
  });
  return (
    <div>
      <div className={cx(positionCss, rotateLayerContainerCss, 'rotate')}>
        <div className={cx(animationCss, smallCircleLayerCss)}>
          <div className={cx(smallCircleCss)} />
        </div>
        <div className={cx(isPaused ? pauseBorderLayerCss : borderLayerCss, animationCss)}></div>
      </div>
      <div className={cx(outerBoxShadowLayerCss, positionCss)}></div>
      <div className={cx(innerBoxShadowLayerCss, positionCss)}></div>
    </div>
  );
}

export default StopwatchContainer;

const positionCss = css({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: 0,
  width: '312px',
  height: '312px',
  borderRadius: '312px',
});

const rotateLayerContainerCss = css({
  width: '320px',
  height: '320px',
  overflow: 'hidden',
  padding: '8px',
  // boxSizing: 'content-box',
  bottom: '-4px !',
  top: 'auto !',
  right: 'auto !',
  left: '-6px !',
  borderRadius: '0 !',

  '& > div': {
    position: 'absolute',
    bottom: '4px',
    left: '4px',
    right: '0',
    margin: 'auto',
    width: '312px',
    height: '312px',
    borderRadius: '312px',
  },
});

const smallCircleLayerCss = css({
  zIndex: 5,
  transition: '.7s ease-in-out',
  transformOrigin: '50% 50%',
  animation: 'circleRotate 60s linear infinite',
});

const smallCircleCss = css({
  background: '#FAD1FD',
  filter: 'drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.30))',
  width: '10px',
  height: '10px',
  borderRadius: '10px',

  position: 'absolute',
  top: '-3px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 5,
});

const innerBoxShadowLayerCss = css({
  border: '4px solid transparent',
  background: 'linear-gradient(136deg, rgba(240, 168, 198, 0.02) 15.95%, rgba(143, 169, 255, 0.02) 85.07%)',
  boxShadow: '0px 4px 40px 4px rgba(78, 85, 122, 0.80) inset, 10px 10px 100px 0px rgba(151, 155, 255, 0.07)',
  zIndex: 2,
});

const borderLayerCss = css({
  border: '4px solid transparent',
  padding: '0px !', // NOTE: padding 0 필수,
  backgroundOrigin: 'border-box',
  backgroundClip: 'content-box, border-box',
  backgroundImage:
    'linear-gradient(token(colors.bg.surface1), token(colors.bg.surface1)), conic-gradient(#FFC6DB, #EDBCF2,#EDBCF2,#ABDAFD, #9AC2FF,#FFC6DB)',
  zIndex: 1,
  transition: '.7s ease-in-out',
  transformOrigin: '50% 50%',
  animation: 'circleRotate 60s linear infinite',
});

const pauseBorderLayerCss = css({
  border: '4px solid token(colors.gray.gray500) !',
  backgroundOrigin: 'border-box',
  backgroundClip: 'content-box, border-box',
  zIndex: 1,
});

const outerBoxShadowLayerCss = css({
  border: '4px solid #2C2F37',
  boxShadow:
    '0px 10px 30px 5px rgba(19, 15, 195, 0.07), -10px 10px 20px 5px rgba(215, 114, 114, 0.05), 15px 10px 20px 5px rgba(57, 180, 219, 0.04)',
  zIndex: 0,
});
