import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';

function LoadingSpinner() {
  return (
    <div className={loadingWrapperCss}>
      <Icon name="spinner" />
    </div>
  );
}

const loadingWrapperCss = css({
  animation: 'circleRotate 1s linear infinite',
  width: '36px',
  height: '36px',
});

export default LoadingSpinner;
