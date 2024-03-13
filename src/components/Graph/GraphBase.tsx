import { type PropsWithChildren } from 'react';
import Icon from '@/components/Icon';
import ProgressBar from '@/components/ProgressBar';
import { gradientTextCss } from '@/constants/style/gradient';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { getPercent } from '@/utils/result';

function GraphRoot({ children }: PropsWithChildren) {
  return <section className={containerCss}>{children}</section>;
}

const containerCss = flex({
  margin: '0 auto',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
});

function SymbolText(props: { symbolStack: number }) {
  return (
    <div className={levelWrapperCss}>
      <Icon name="10mm-symbol-fill" width={16} height={16} />
      <span className={cx(levelLabelCss, gradientTextCss)}>{props.symbolStack}</span>
    </div>
  );
}

const levelWrapperCss = flex({
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',
  height: '43px',
});

const levelLabelCss = css({
  fontSize: '36px',
  lineHeight: '43px',
  fontWeight: '100',
});

interface ProgressBarBaseProps {
  isLabel?: boolean;
}

interface ProgressingProgressBarProps extends ProgressBarBaseProps {
  symbolStack: number;
  min: number;
  max: number;
  isFull?: false;
}

interface FullProgressBarProps extends ProgressBarBaseProps {
  isFull: true;
  min?: number;
}

type LevelProgressBarProps = ProgressingProgressBarProps | FullProgressBarProps;

function LevelProgressBar(props: LevelProgressBarProps) {
  if (props?.isFull) {
    return <ProgressBar percent={100} labels={props.isLabel && props.min ? [`${props.min} 이상`] : undefined} />;
  }

  const { symbolStack, max, min } = props;
  const percent = getPercent({ symbolStack, max, min });

  return <ProgressBar percent={percent} labels={props.isLabel ? [String(min), String(max)] : undefined} />;
}

function Description({ children }: PropsWithChildren) {
  return <div className={descriptionCss}>{children}</div>;
}

const descriptionCss = css({
  textStyle: 'body4',
  color: 'text.tertiary',
  textAlign: 'center',
});

export default Object.assign(GraphRoot, {
  SymbolText,
  ProgressBar: LevelProgressBar,
  Description,
});
