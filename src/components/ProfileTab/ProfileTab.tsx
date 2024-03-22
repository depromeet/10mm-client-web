'use client';
import { useGetMembersMe } from '@/apis/member';
import ProfileFeedList from '@/components/ProfileTab/ProfileFeedList';
import ProfileMissionList from '@/components/ProfileTab/ProfileMissionList';
import Tab from '@/components/Tab/Tab';
import { useTab } from '@/components/Tab/Tab.hooks';
import { type TabType } from '@/components/Tab/Tab.types';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { eventLogger } from '@/utils';
import { css } from '@styled-system/css';

const PROFILE_TABS = [
  {
    tabName: '피드',
    id: 'feed',
  },
  {
    tabName: '미션 목록',
    id: 'mission-list',
  },
];

// TODO : mypage, profile에서 따로 사용하도록 리팩토링 하면 좋을 듯
function ProfileTab({ memberId }: { memberId: number }) {
  const { tabs, activeTab, onTabClick } = useTab(PROFILE_TABS, 'feed');
  const { data } = useGetMembersMe();
  if (!data) return null;

  const isMySelf = memberId === data.memberId;

  const handleTabClick = (tab: TabType) => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.FOLLOW_PROFILE, EVENT_LOG_NAME.FOLLOW_PROFILE.CLICK_TAB, {
      tabName: tab.tabName,
      isMySelf,
    });
    onTabClick(tab);
  };

  return (
    <>
      <div className={tabWrapper}>
        <Tab tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
      </div>
      <TabContent activeTab={activeTab} memberId={memberId} isMySelf={isMySelf} />
    </>
  );
}

export default ProfileTab;

function TabContent({ activeTab, memberId, isMySelf }: { activeTab: string; memberId: number; isMySelf: boolean }) {
  if (activeTab === 'feed') {
    return <ProfileFeedList memberId={memberId} isMySelf={isMySelf} />;
  }
  if (activeTab === 'mission-list') {
    return <ProfileMissionList id={!isMySelf ? memberId : undefined} />;
  }
}

const tabWrapper = css({
  margin: '36px 0 24px',
});
