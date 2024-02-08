'use client';

import Link from 'next/link';
import { useFollowsCountMembers } from '@/apis/follow';
import { useGetMembersMe } from '@/apis/member';
import { useGetMissionStack } from '@/apis/mission';
import MyProfileMissionList from '@/app/mypage/MyProfileMissionList';
import ProfileContent from '@/app/profile/[id]/ProfileContent';
import Button from '@/components/Button/Button';
import Tab from '@/components/Tab/Tab';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { eventLogger } from '@/utils';

const tabs = [
  {
    tabName: '미션 목록',
    id: 'mission-list',
  },
];

export default function MyProfile() {
  const { data } = useGetMembersMe();
  const memberId = data?.memberId ?? 0;
  const { data: symbolStackData } = useGetMissionStack(memberId.toString());
  const symbolStack = symbolStackData?.symbolStack ?? 0;
  const { data: followCountData } = useFollowsCountMembers();

  const handleProfileEditClick = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.MY_PAGE, EVENT_LOG_NAME.MY_PAGE.CLICK_EDIT);
  };
  return (
    <ProfileContent
      memberId={memberId}
      profileImageUrl={data?.profileImageUrl || null}
      nickname={data?.nickname || ''}
      symbolStack={symbolStack}
      followerCount={followCountData?.followerCount || 0}
      followingCount={followCountData?.followingCount || 0}
      rightElement={
        <Link href={ROUTER.MYPAGE.PROFILE_MODIFY} onClick={handleProfileEditClick}>
          <Button className={profileEditButtonCss} color="gray">
            프로필 수정
          </Button>
        </Link>
      }
    >
      <div className={tabWrapper}>
        <Tab tabs={tabs} activeTab={'mission-list'} />
      </div>
      <MyProfileMissionList />
    </ProfileContent>
  );
}

const tabWrapper = css({
  margin: '20px 0',
  padding: '16px 16px 0 16px',
});

const profileEditButtonCss = css({
  border: '1px solid',
  borderColor: 'gray.gray500',
  borderRadius: '20px',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'gray.gray800',
  height: '30px',
  padding: '6px 12px',
  fontSize: '13px',
});
