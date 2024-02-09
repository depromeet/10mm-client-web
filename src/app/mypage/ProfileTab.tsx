import { useGetMembersMe } from '@/apis/member';
import ProfileFeedList from '@/app/mypage/ProfileFeedList';
import ProfileMissionList from '@/app/mypage/ProfileMissionList';
import Tab from '@/components/Tab/Tab';
import { useTab } from '@/components/Tab/Tab.hooks';
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

function ProfileTab({ memberId }: { memberId: number }) {
  const { tabs, activeTab, onTabClick } = useTab(PROFILE_TABS, 'feed');
  return (
    <>
      <div className={tabWrapper}>
        <Tab tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
      </div>
      <TabContent activeTab={activeTab} memberId={memberId} />
    </>
  );
}

export default ProfileTab;

function TabContent({ activeTab, memberId }: { activeTab: string; memberId: number }) {
  const { data } = useGetMembersMe();
  if (!data) return null;

  const isMySelf = memberId === data.memberId;

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
