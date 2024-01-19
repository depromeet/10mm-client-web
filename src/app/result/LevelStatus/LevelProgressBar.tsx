import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  current: number;
  min?: number;
  max?: number;
  isLabel?: boolean;
}

function LevelProgressBar({ current, isLabel, min = 0, max = 100 }: Props) {
  const percent = (100 / (max - min)) * (current - min);

  return (
    <div className={progressContainerCss}>
      <div className={progressInnerContainerCss} style={{ width: `${percent}%` }} />
      {isLabel && (
        <div className={labelContainerCss}>
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}

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
  position: 'absolute',
  textStyle: 'body4',
  color: 'text.quaternary',
  marginTop: '5px',
  left: 0,
  right: 0,
  width: '100%',
  top: '100%',
  justifyContent: 'space-between',
});

export default LevelProgressBar;
