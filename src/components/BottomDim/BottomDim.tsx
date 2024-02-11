import { cva } from '@/styled-system/css';

function BottomDim({ type = 'bottomDim1' }: { type?: 'bottomDim1' | 'bottomDim2' }) {
  return (
    <article
      className={containerCss({
        type: type,
      })}
    ></article>
  );
}

export default BottomDim;

const containerCss = cva({
  base: {
    width: '100vw',
    maxWidth: '475px',
    margin: '0 auto',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 'bottomDim',
    pointerEvents: 'none',
  },
  variants: {
    type: {
      bottomDim1: {
        background:
          'linear-gradient(180deg, rgba(24, 24, 29, 0.00) 0%, rgba(24, 24, 29, 0.09) 7.58%, rgba(24, 24, 29, 0.59) 34.59%, rgba(24, 24, 29, 0.69) 41.18%, rgba(24, 24, 29, 0.83) 51.39%, #18181D 63.25%)',
        height: '200px',
      },

      bottomDim2: {
        background:
          'linear-gradient(180deg, rgba(24, 24, 29, 0.00) 0%, rgba(24, 24, 29, 0.10) 15.1%, rgba(24, 24, 29, 0.61) 51.56%, rgba(24, 24, 29, 0.73) 70.83%, rgba(24, 24, 29, 0.85) 86.98%, #18181D 100%)',
        height: '156px',
      },
    },
  },
});
