'use client';

import Link from 'next/link';
import { useFollowsCountMembers } from '@/apis/follow';
import { useGetMembersMe } from '@/apis/member';
import { useGetMissionStack } from '@/apis/mission';
import MyProfileMissionList from '@/app/mypage/MyProfileMissionList';
import ProfileContent from '@/app/profile/[id]/ProfileContent';
import Button from '@/components/Button/Button';
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
  const memberId = data?.memberId ?? 0;
  const { data: symbolStackData } = useGetMissionStack(memberId.toString());
  const symbolStack = symbolStackData?.symbolStack ?? 0;
  const { data: followCountData } = useFollowsCountMembers();

  return (
    <ProfileContent
      memberId={memberId}
      profileImageUrl={data?.profileImageUrl || null}
      nickname={data?.nickname || ''}
      symbolStack={symbolStack}
      followerCount={followCountData?.followerCount || 0}
      followingCount={followCountData?.followingCount || 0}
      rightElement={
        <Link href={ROUTER.MYPAGE.PROFILE_MODIFY}>
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
  margin: '36px 0 24px',
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
