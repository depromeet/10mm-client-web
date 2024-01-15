import Link from 'next/link';
import Icon from '@/components/Icon';
import NullableThumbnail from '@/components/Thumbnail/NullableThumnail';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function ProfileContent({ nickname, profileUrl }: { nickname: string; profileUrl: string | null }) {
  return (
    <section className={containerCss}>
      <Link href={ROUTER.MYPAGE.PROFILE_MODIFY}>
        <div className={profileWrapperCss}>
          <NullableThumbnail size="h52" url={profileUrl} />
          <p className={nicknameCss}>{nickname}</p>
          <Icon name="arrow-forward" width={16} height={16} color="icon.secondary" />
        </div>
      </Link>
    </section>
  );
}

export default ProfileContent;

const containerCss = flex({
  margin: '16px',
  padding: '12px',
  flexDirection: 'column',
  gap: '14px',
  borderRadius: '22px',
  boxShadow: '0px 5px 50px 4px rgba(92, 78, 122, 0.50) inset, 0px 4px 20px 0px rgba(16, 15, 23, 0.20)',
  background: 'linear-gradient(93deg, rgba(25, 23, 27, 0.80) 0.82%, rgba(24, 25, 33, 0.80) 99.97%)',
  backdropFilter: 'blur(20px)',
});

const profileWrapperCss = flex({
  gap: '10px',
  alignItems: 'center',
});

const nicknameCss = css({
  textStyle: 'subtitle2',
  color: 'text.primary',
  flex: 1,

  // 한줄 말줄임 처리
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  minWidth: '0',
  whiteSpace: 'nowrap',
});
