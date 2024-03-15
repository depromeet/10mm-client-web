import Link from 'next/link';
import Icon from '@/components/Icon';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import MissionListInner from '@/pages/home/FollowContent/MyMissionInnerList';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { eventLogger } from '@/utils';

function MissionList() {
  return (
    <div className={containerCss}>
      <MissionListHeader />
      <ul className={listCss}>
        <MissionListInner />
      </ul>
    </div>
  );
}

export default MissionList;

function MissionListHeader() {
  const handlePlusClick = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.HOME, EVENT_LOG_NAME.HOME.CLICK_PLUS_BUTTON);
  };

  return (
    <h2 className={headingCss}>
      <span>내 미션 목록</span>
      <Link href={ROUTER.MISSION.NEW} onClick={handlePlusClick}>
        <Icon name="plus" size={20} color="icon.primary" />
      </Link>
    </h2>
  );
}

const containerCss = css({
  height: '100%',
});

const headingCss = flex({
  padding: '12px 4px',
  justifyContent: 'space-between',
  textStyle: 'body4',
  color: 'text.primary',
  userSelect: 'none',
});

const listCss = flex({
  flexDirection: 'column',
  flex: 1,

  gap: '8px',
  height: '100%',
});
