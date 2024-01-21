import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  current: number;
  min?: number;
  max?: number;
  isLabel?: boolean;
  isFinal?: boolean;
}

function LevelProgressBar({ current, isLabel, isFinal, min = 0, max = 100 }: Props) {
  const percent = isFinal ? 100 : (100 / (max - min)) * (current - min);

  return (
    <div className={containerCss}>
      <div className={progressContainerCss}>
        <div className={progressInnerContainerCss} style={{ width: `${percent}%` }} />
      </div>
      {isLabel && (
        <div className={labelContainerCss}>
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}

const containerCss = css({
  width: '100%',
});

const progressContainerCss = css({
  borderRadius: '10px',
  backgroundColor: '#3B3E4F',
  width: '100%',
  position: 'relative',
  // overflow: 'hidden',
  height: '4px',
});

const progressInnerContainerCss = css({
  position: 'absolute',
  borderRadius: '10px',
  background: 'gradients.primary',
  height: '100%',
  transition: 'width .7s ease-in-out',
});

const labelContainerCss = flex({
  textStyle: 'body4',
  color: 'text.quaternary',
  marginTop: '5px',
  width: '100%',
  justifyContent: 'space-between',
});

export default LevelProgressBar;
