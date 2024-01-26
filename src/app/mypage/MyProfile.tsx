'use client';

import Link from 'next/link';
import { useGetMembersMe } from '@/apis/member';
import { useGetMissionSummary } from '@/apis/mission';
import MyProfileMissionList from '@/app/mypage/MyProfileMissionList';
import ProfileContent from '@/app/profile/[id]/ProfileContent';
import Badge from '@/components/Badge/Badge';
import Tab from '@/components/Tab/Tab';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';

const tabs = [
  {
    tabName: '미션 목록',
    id: 'mission-list',
  },
];

export default function MyProfile() {
  const { data } = useGetMembersMe();
  const { data: missionSummaryData } = useGetMissionSummary();

  const symbolStack = missionSummaryData?.symbolStack ?? 0;

  return (
    <ProfileContent
      profileImageUrl={data?.profileImageUrl || null}
      nickname={data?.nickname || ''}
      symbolStack={symbolStack}
      followerCount={12}
      followingCount={12}
      rightElement={
        <Link href={ROUTER.MYPAGE.PROFILE_MODIFY}>
          <Badge color="gray">프로필 수정</Badge>
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
