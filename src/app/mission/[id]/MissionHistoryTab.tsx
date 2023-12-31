import MissionHistoryBanner from '@/app/mission/[id]/MissionHistoryBanner';
import MissionHistoryCalendar from '@/app/mission/[id]/MissionHistoryCalender/MissionHistoryCalendar';
import { css } from '@styled-system/css';

function MissionHistoryTab() {
  const title = '디자인 아티클 읽고 기록하기';
  const description = '하루에 아티클 3개 이상 읽고 인사이트 작성하자!';
  const imageUrl = '/images/emoji_study.png';

  return (
    <div className={missionHistoryTabCss}>
      <MissionHistoryBanner title={title} description={description} imageUrl={imageUrl} />
      <MissionHistoryCalendar currentDate={new Date()} />
    </div>
  );
}

export default MissionHistoryTab;

const missionHistoryTabCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '24px 16px',
});
