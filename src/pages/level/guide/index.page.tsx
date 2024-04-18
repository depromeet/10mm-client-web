import { useEffect, useState } from 'react';
import { useGetMissionSummary } from '@/apis/mission';
import Header from '@/components/Header/Header';
import Character from '@/components/Level/Character';
import LockedCharacter from '@/components/Level/LockedCharacter';
import LevelStatus from '@/components/LevelStatus/LevelStatus';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';
import MotionDiv from '@/components/Motion/MotionDiv';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { LEVEL_SYSTEM } from '@/constants/level';
import GrowthLevel from '@/pages/level/guide/GrowthLevel';
import { css, cx } from '@/styled-system/css';
import { eventLogger } from '@/utils';
import { getLevel } from '@/utils/result';

function LevelGuidePage() {
  const { data, isLoading } = useGetMissionSummary();
  const symbolStack = data?.symbolStack ?? 0;
  const currentLevelInfo = getLevel(symbolStack);

  const [selectLevel, setSelectLevel] = useState<number>(1);

  const selectLevelInfo = LEVEL_SYSTEM[selectLevel - 1];
  const isLockedLevel = currentLevelInfo.level < selectLevelInfo.level;
  const isMyLevel = currentLevelInfo.level === selectLevelInfo.level;

  const handleClickedLevel = (level: number) => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.LEVEL, EVENT_LOG_NAME.LEVEL.CLICK_LEVEL, {
      level,
    });
    setSelectLevel(level);
  };

  useEffect(() => {
    if (currentLevelInfo) {
      setSelectLevel(currentLevelInfo.level);
    }
  }, [currentLevelInfo]);

  return (
    <>
      <Header rightAction="none" title="내 레벨" />
      <main className={containerCss}>
        <div className={levelInfoContainerCss}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <section className={levelTextWrapperCss}>
                <p className={levelLabelCss}>{isMyLevel && '현재 레벨'}</p>
                <div className={cx(badgeCss)}>
                  <MotionDiv key={selectLevelInfo.label}>{selectLevelInfo.label}</MotionDiv>
                </div>
              </section>
              <section className={characterImageSectionCss}>
                {isLockedLevel ? (
                  <LockedCharacter size="lg" level={selectLevelInfo.level} />
                ) : (
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
          <GrowthLevel selectLevel={selectLevel} onClick={handleClickedLevel} maxLevel={currentLevelInfo.level} />
        </section>
      </main>
    </>
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
  height: '17px',
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
    transform: 'translate(0,0)',
  },
  '& .character-image-bg': {
    left: '50%',
    transform: 'translateX(-50%)',
    minWidth: '375px',
    minHeight: '382px',
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

const containerCss = css({
  minHeight: '720px',
});
