'use client';

import { useEffect, useState } from 'react';
import { useGetMissionSummary } from '@/apis/mission';
import Character from '@/app/level/guide/Character';
import GrowthLevel from '@/app/level/guide/GrowthLevel';
import LockedCharacter from '@/components/Level/LockedCharacter';
import LevelStatus from '@/components/LevelStatus/LevelStatus';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';
import { LEVEL_SYSTEM } from '@/constants/level';
import { defaultFadeInMotion } from '@/constants/style/animation';
import { css, cx } from '@/styled-system/css';
import { getLevel } from '@/utils/result';
import { motion } from 'framer-motion';

function LevelGuidePage() {
  const { data, isLoading } = useGetMissionSummary();
  const symbolStack = data?.symbolStack ?? 0;
  const currentLevelInfo = getLevel(symbolStack);

  const [selectLevel, setSelectLevel] = useState<number>(1);

  const selectLevelInfo = LEVEL_SYSTEM[selectLevel - 1];
  const isLockedLevel = currentLevelInfo.level < selectLevelInfo.level;

  useEffect(() => {
    if (currentLevelInfo) {
      setSelectLevel(currentLevelInfo.level);
    }
  }, [currentLevelInfo]);

  return (
    <div>
      <div className={levelInfoContainerCss}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <section className={levelTextWrapperCss}>
              <p className={levelLabelCss}>현재 레벨</p>
              <div className={cx(badgeCss)}>
                <motion.span key={selectLevelInfo.label} {...defaultFadeInMotion}>
                  {selectLevelInfo.label}
                </motion.span>
              </div>
            </section>
            <section className={characterImageSectionCss}>
              {isLockedLevel ? (
                <LockedCharacter size="lg" level={selectLevelInfo.level} />
              ) : (
                // <Character width={202} height={151} level={selectLevelInfo.level} isLocked={isLockedLevel} />
                <Character
                  width={240}
                  height={180}
                  level={selectLevelInfo.level}
                  isLocked={isLockedLevel}
                  isBackground
                />
              )}
            </section>
            <LevelStatus symbolStack={symbolStack} viewLevel={selectLevelInfo.level} />
          </>
        )}
      </div>
      <section className={growthSectionCss}>
        <GrowthLevel
          selectLevel={selectLevel}
          onClick={(level) => setSelectLevel(level)}
          maxLevel={currentLevelInfo.level}
        />
      </section>
    </div>
  );
}

export default LevelGuidePage;

const levelInfoContainerCss = css({
  minHeight: '407px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '16px',
});

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
  position: 'fixed',
  maxWidth: '475px',
  width: '100vw',
  margin: '0 auto 54px',
  bottom: '0',
  left: 0,
  right: 0,
});
