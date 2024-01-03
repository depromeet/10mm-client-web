import HistoryThumbnail from '@/app/mission/[id]/history/[historyId]/HistoryThumbnail';
import MissionHistoryPageHeader from '@/app/mission/[id]/history/[historyId]/MissionHistoryPageHeader';
import { css } from '@styled-system/css';

function MissionHistoryPage() {
  const dateCount = 2;

  const missionDescription = '오늘은 디자인시스템 관련 아티클을 3개 읽었다. 10분을 알차게 써서 뿌듯하다!!';
  return (
    <main className={mainWrapperCss}>
      <MissionHistoryPageHeader />
      <section className={missionHistorySectionCss}>
        <div className={sectionTitleCss}>
          <span className={textSecondaryColorCss}>2023년 11월 12일</span>
          <span className={textTertiaryColorCss}>{dateCount}일차</span>
        </div>
        <HistoryThumbnail imageUrl={'/images/mission-image-test.png'} missionDuration={21} />
        <span className={textSecondaryColorCss}>{missionDescription}</span>
      </section>
    </main>
  );
}

export default MissionHistoryPage;

const textSecondaryColorCss = css({
  color: 'text.secondary',
});

const textTertiaryColorCss = css({
  color: 'text.tertiary',
});

const mainWrapperCss = css({
  width: '100%',
});

const sectionTitleCss = css({
  display: 'flex',
  justifyContent: 'space-between',
});

const missionHistorySectionCss = css({
  padding: '32px 16px 0 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  textStyle: 'body1',
});
