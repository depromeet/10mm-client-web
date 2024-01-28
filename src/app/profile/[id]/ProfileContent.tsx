import { type PropsWithChildren } from 'react';
import Link from 'next/link';
import Banner from '@/components/Banner/Banner';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { ROUTER } from '@/constants/router';
import { getLevel } from '@/utils/result';
import { css } from '@styled-system/css';

interface ProfileContentProps {
  profileImageUrl: string | null;
  nickname: string;
  symbolStack: number;
  followerCount: number;
  followingCount: number;
  rightElement?: React.ReactNode;
}

function ProfileContent({
  profileImageUrl,
  nickname,
  symbolStack,
  followerCount,
  followingCount,
  rightElement,
  children,
}: PropsWithChildren<ProfileContentProps>) {
  const currentLevel = getLevel(symbolStack);
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
              팔로잉 {followerCount} &nbsp; 팔로워 {followingCount}
            </span>
          </div>
          {rightElement}
        </div>
        <Link href={ROUTER.LEVEL.GUIDE}>
          <Banner
            type="level"
            amount={symbolStack}
            iconName="alarm"
            level={currentLevel.label}
            imageUrl={currentLevel.imageUrl}
          />
        </Link>
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
  padding: '52px 24px 0',
});
const userNameCss = css({
  color: 'text.primary',
  fontSize: 'subtitle2',
  fontWeight: 'semibold',
});
const followerTabCss = css({
  color: 'text.secondary',
  marginTop: '6px',
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
