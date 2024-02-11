'use client';

import Image from 'next/image';
import Character from '@/app/level/guide/Character';
import Icon from '@/components/Icon';
import MotionDiv from '@/components/Motion/MotionDiv';
import ProgressBar from '@/components/ProgressBar';
import { gradientTextCss } from '@/constants/style/gradient';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { getLevel, getPercent } from '@/utils/result';

interface Props {
  symbolStack?: number;
}

function ImageAreaSection({ symbolStack }: Props) {
  // TODO: skeleton 추가
  if (symbolStack === undefined) {
    return <section className={sectionCss}></section>;
  }

  const currentLevel = getLevel(symbolStack);
  const { max, min } = currentLevel;
  const percent = getPercent({ max, min, symbolStack });

  return (
    <section className={sectionCss}>
      <div className={levelStatusCss}>
        <div className={levelWrapperCss}>
          <span className={cx(levelLabelCss, gradientTextCss)}>{symbolStack}</span>
          <Icon name="10mm-symbol-fill" width={16} height={16} />
        </div>
        <p className={levelTextCss}>{currentLevel.label}</p>
        <ProgressBar percent={percent} progressColor="purple.purple500" />
      </div>

      <MotionDiv variants="fadeInUp" className={imageSectionCss}>
        <div className={characterBgCss}>
          <Image src="/assets/result/character-bg-gradient.svg" alt="gradient-bg" width={255} height={260} />
        </div>
        <Character width={200} height={150} level={currentLevel.level} />
      </MotionDiv>
    </section>
  );
}

export default ImageAreaSection;

const levelWrapperCss = flex({
  gap: '8px',
  alignItems: 'center',
  height: '43px',
});

const levelLabelCss = css({
  fontSize: '36px',
  lineHeight: '43px',
  fontWeight: '100',
});

const sectionCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '219px',
  paddingLeft: '32px',
  paddingRight: '24px',
});

const levelTextCss = css({
  margin: '12px 0 10px',
  color: '#fff',
  textStyle: 'caption',
});

const levelStatusCss = css({
  width: '93px',
  '& > div': {
    width: '93px',
  },
});

const imageSectionCss = css({
  position: 'relative',
  width: '200px',
  height: '150px',
});

const characterBgCss = css({
  width: '255px',
  height: '260px',
  position: 'absolute',
  top: '-41px',
  left: '50%',
  transform: 'translateX(-50%)',
});
