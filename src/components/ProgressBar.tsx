import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function ProgressBar(props: { percent: number; labels?: string[]; progressColor?: string }) {
  const progressBarColor = props.progressColor || 'gradients.primary';

  return (
    <div className={progressBarContainerCss}>
      <div className={progressContainerCss}>
        <div
          className={cx(progressInnerContainerCss, css({ background: progressBarColor }))}
          style={{ width: `${props.percent}%` }}
        />
      </div>
      {props.labels && (
        <div
          className={cx(
            labelContainerCss,
            css({ justifyContent: props.labels.length === 1 ? 'center' : 'space-between' }),
          )}
        >
          {props.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProgressBar;

const progressBarContainerCss = css({
  width: '214px',
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
  transition: 'width .7s ease-in-out',
});

const labelContainerCss = flex({
  textStyle: 'body4',
  color: 'text.quaternary',
  marginTop: '5px',
  width: '100%',
});
