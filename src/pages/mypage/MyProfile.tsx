import Link from 'next/link';
import { useFollowsCountMembers } from '@/apis/follow';
import { useGetMembersMe } from '@/apis/member';
import { useGetMissionStack } from '@/apis/mission';
import ProfileContent from '@/components/ProfileContent';
import ProfileTab from '@/components/ProfileTab/ProfileTab';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { eventLogger } from '@/utils';

export default function MyProfile() {
  const { data } = useGetMembersMe();
  const memberId = data?.memberId ?? 0;

  const { data: symbolStackData } = useGetMissionStack(memberId.toString());
  const { data: followCountData } = useFollowsCountMembers();

  const symbolStack = symbolStackData?.symbolStack ?? 0;

  const handleProfileEditClick = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.MY_PAGE, EVENT_LOG_NAME.MY_PAGE.CLICK_EDIT);
  };

  // TODO : children으로 넘겨야 하는 이유가 뭐지?
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
          <button type={'button'} className={profileEditButtonCss}>
            <span>프로필 수정</span>
          </button>
        </Link>
      }
    >
      <ProfileTab memberId={memberId} />
    </ProfileContent>
  );
}

const profileEditButtonCss = css({
  border: '1px solid #464856',
  borderRadius: '20px',
  backgroundColor: 'transparent',
  color: 'gray.gray800',
  display: 'flex',
  textStyle: 'body5',
  alignItems: 'center',
  justifyContent: 'center',
  height: '30px',
  padding: '6px 12px',
});
