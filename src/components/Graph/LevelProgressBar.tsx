import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { type ColorToken } from '@styled-system/tokens';
import { motion } from 'framer-motion';

interface Props {
  current: number;
  backgroundColor?: ColorToken;
  min?: number;
  max?: number;
  isLabel?: boolean;
  isFinal?: boolean;
}
// TODO : 공통컴포넌트
function LevelProgressBar({
  current,
  isLabel,
  isFinal,
  min = 0,
  max = 100,
  backgroundColor = 'gradients.primary',
}: Props) {
  const percent = isFinal ? 100 : (100 / (max - min)) * (current - min);

  return (
    <div className={containerCss}>
      <div className={progressContainerCss}>
        <motion.div
          className={cx(
            progressInnerContainerCss,
            css({
              background: backgroundColor,
            }),
          )}
          style={{ width: `${percent}%` }}
          initial={{ width: '0' }}
          animate={{ width: `${percent}%` }}
        />
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
  height: '4px',
});

const progressInnerContainerCss = css({
  position: 'absolute',
  borderRadius: '10px',
  height: '100%',
});

const labelContainerCss = flex({
  textStyle: 'body4',
  color: 'text.quaternary',
  marginTop: '5px',
  width: '100%',
  justifyContent: 'space-between',
});

export default LevelProgressBar;
