'use client';

import Character from '@/app/level/guide/Character';
import Graph from '@/components/Graph/GraphBase';
import MotionDiv from '@/components/Motion/MotionDiv';
import ProgressBar from '@/components/ProgressBar';
import { css } from '@/styled-system/css';
import { getLevel, getPercent } from '@/utils/result';

interface Props {
  symbolStack: number;
}

function ImageAreaSection({ symbolStack }: Props) {
  const currentLevel = getLevel(symbolStack);
  const { max, min } = currentLevel;
  const percent = getPercent({ max, min, symbolStack });

  return (
    <section className={characterSectionCss}>
      <div className={levelStatusCss}>
        <Graph.SymbolText symbolStack={symbolStack} />
        <p className={levelTextCss}>{currentLevel.label}</p>
        <ProgressBar percent={percent} progressColor="purple.purple500" />
      </div>
      <MotionDiv variants="fadeInUp" className={imageSectionCss}>
        <Character width={200} height={150} level={currentLevel.level} isBackground />
      </MotionDiv>
    </section>
  );
}

export default ImageAreaSection;

const characterSectionCss = css({
  display: 'flex',
  alignItems: 'center',
  height: '219px',
});

const levelTextCss = css({
  margin: '12px 0 10px',
  color: '#fff',
  textStyle: 'caption',
});

const levelStatusCss = css({
  paddingLeft: '28px',
  '& > div': {
    width: '93px',
  },
});

const levelGuideLinkCss = css({
  color: 'purple.purple500',
  textStyle: 'body3',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginTop: '17px',
});

const imageSectionCss = css({
  margin: '43px auto 12px',
  position: 'relative',
  height: '210px',
  width: '100%',
});
