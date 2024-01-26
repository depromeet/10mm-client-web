import { css } from '@/styled-system/css';

function BottomDim() {
  return <article className={containerCss}></article>;
}

export default BottomDim;

const containerCss = css({
  width: '100vw',
  height: '200px',
  maxWidth: '475px',
  margin: '0 auto',
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 'bottomDim',
  background:
    'linear-gradient(180deg, rgba(24, 24, 29, 0.00) 0%, rgba(24, 24, 29, 0.09) 7.58%, rgba(24, 24, 29, 0.59) 34.59%, rgba(24, 24, 29, 0.69) 41.18%, rgba(24, 24, 29, 0.83) 51.39%, #18181D 63.25%)',
});
