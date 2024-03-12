import { Fragment } from 'react';
import { STOPWATCH_STATUS_LABEL } from '@/hooks/mission/stopwatch/useStopwatchStatus';
import { css, cx } from '@styled-system/css';

import { useStopwatchStepContext } from './Stopwatch.context';

function TextSection() {
  const { step } = useStopwatchStepContext();

  const stepLabel = STOPWATCH_STATUS_LABEL[step];

  return (
    <div className={containerCss}>
      <section key={step} className={opacityAnimation}>
        <h1 className={cx(titleCss)}>{stepLabel.title}</h1>
        <p className={descCss}>
          {stepLabel.desc.split('\n').map((text) => (
            <Fragment key={text}>
              {text}
              <br />
            </Fragment>
          ))}
        </p>
      </section>
    </div>
  );
}

export default TextSection;

const containerCss = css({
  padding: '24px 16px',
});
const titleCss = css({ color: 'text.primary', textStyle: 'title2' });
const descCss = css({
  color: 'text.secondary',
  textStyle: 'body4',
  marginTop: '8px',
  marginBottom: '76px',
  minHeight: '40px',
});

const opacityAnimation = css({
  animation: 'fadeIn .7s',
});
