'use client';

import Image from 'next/image';
import { useGetMissionSummary } from '@/apis/mission';
import GrowthLevel from '@/app/level/guide/GrowthLevel';
import LevelStatus from '@/components/LevelStatus/LevelStatus';
import { css } from '@/styled-system/css';
import { getLevel } from '@/utils/result';

function LevelGuidePage() {
  const { data } = useGetMissionSummary();
  const symbolStack = data?.symbolStack ?? 0;
  const currentLevel = getLevel(symbolStack);

  return (
    <div>
      <section className={levelTextWrapperCss}>
        <p className={levelLabelCss}>현재 레벨</p>
        <div className={badgeCss}>{currentLevel.label}</div>
      </section>
      <section className={characterImageSectionCss}>
        <Image src="/assets/level/level-guide-bg.png" alt={'guild bg'} width={240} height={180} />
        <Image src={currentLevel.imageUrl} alt={'character image'} width={240} height={180} />
      </section>
      <LevelStatus current={symbolStack} level={currentLevel} />
      <section className={growthSectionCss}>
        <GrowthLevel />
      </section>
    </div>
  );
}

export default LevelGuidePage;

const levelTextWrapperCss = css({
  width: 'fit-content',
  margin: '0 auto',
  textAlign: 'center',
});

const levelLabelCss = css({
  textStyle: 'body5',
  color: 'purple.purple700',
  marginBottom: '8px',
});

const badgeCss = css({
  padding: '10px 20px',
  color: 'text.secondary',
  textStyle: 'subtitle4',
  borderRadius: '30px',
  backgroundColor: 'purple.purple050',
  width: 'fit-content',
});

const characterImageSectionCss = css({
  position: 'relative',
  width: '100%',
  height: '180px',
  marginTop: '24px',
  marginBottom: '20px',

  '& > img': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
});

const growthSectionCss = css({
  marginLeft: '16px',
});
