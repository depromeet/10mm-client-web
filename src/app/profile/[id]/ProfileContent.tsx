import { type PropsWithChildren } from 'react';
import Link from 'next/link';
import Banner from '@/components/Banner/Banner';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { eventLogger } from '@/utils';
import { css } from '@styled-system/css';

interface ProfileContentProps {
  profileImageUrl: string | null;
  nickname: string;
  symbolStack: number;
  followerCount: number;
  followingCount: number;
  rightElement?: React.ReactNode;
  memberId: number;

  // TODO : 파일 위치 조정, 리팩토링 후 제거하면 좋을 props, follow 페이지인지 아닌지 체크
  isFollow?: boolean;
}

// TODO : 파일 위치 조정 (mypage, profile 둘다 사용하는 컴포넌트)
function ProfileContent({
  profileImageUrl,
  nickname,
  symbolStack,
  followerCount,
  followingCount,
  rightElement,
  children,
  memberId,
  isFollow,
}: PropsWithChildren<ProfileContentProps>) {
  const handleClickFollowList = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.MY_PAGE, EVENT_LOG_NAME.MY_PAGE.CLICK_FOLLOW_FOLLOW);
  };
  const handleClickFollowProfile = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.MY_PAGE, EVENT_LOG_NAME.MY_PAGE.CLICK_LEVEL_BANNER);
  };

  return (
    <div className={containerCss}>
      <section className={myTabContainerCss}>
        <section className={thumbnailWrapperCss}>
          <Thumbnail size="h80" url={profileImageUrl} variant={'filled'} />
        </section>
        <div className={myTabCss}>
          <div>
            <p className={userNameCss}>{nickname}</p>
            <span className={followerTabCss}>
              <Link onClick={handleClickFollowList} href={ROUTER.PROFILE.FOLLOW_LIST(memberId, 'following')}>
                팔로잉 {followingCount}
              </Link>
              <Link onClick={handleClickFollowList} href={ROUTER.PROFILE.FOLLOW_LIST(memberId, 'follower')}>
                팔로워 {followerCount}
              </Link>
            </span>
          </div>
          {rightElement}
        </div>
        {isFollow ? (
          <div className={followPageBannerCss}>
            <Banner type="level" symbolStack={symbolStack} />
          </div>
        ) : (
          <Link href={ROUTER.LEVEL.GUIDE} onClick={handleClickFollowProfile}>
            <Banner type="level" symbolStack={symbolStack} />
          </Link>
        )}

        {children}
        <div className={spaceCss} />
      </section>
    </div>
  );
}

export default ProfileContent;

const spaceCss = css({
  height: '50px',
});

const containerCss = css({
  paddingTop: '168px',
  flex: 1,
  zIndex: 3,
});

const myTabContainerCss = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: 'bg.surface2',
  borderTopRightRadius: '28px',
  borderTopLeftRadius: '28px',
  padding: '52px 16px 0',
});
const userNameCss = css({
  color: 'text.primary',
  fontSize: 'subtitle2',
  fontWeight: 'semibold',
});
const followerTabCss = css({
  color: 'text.secondary',
  textStyle: 'body5',
  marginTop: '6px',

  display: 'flex',
  gap: '10px',
});

const myTabCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const thumbnailWrapperCss = css({
  position: 'absolute',
  top: '-40px',
  left: '50%',
  transform: 'translateX(-50%)',
});

const followPageBannerCss = css({
  '& .arrow-forward': {
    visibility: 'hidden',
  },
});
