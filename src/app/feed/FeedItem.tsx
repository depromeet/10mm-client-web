import Link from 'next/link';
import { type FeedItemType } from '@/apis/feed';
import HistoryThumbnail from '@/app/record/[id]/detail/HistoryThumbnail';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

function FeedItem({ remark, nickname, memberId, name, profileImage, recordImageUrl, duration }: FeedItemType) {
  return (
    <li>
      <Link href={ROUTER.PROFILE.DETAIL(memberId)}>
        <div className={profileWrapperCss}>
          <Thumbnail size={'h24'} variant={'filled'} url={profileImage} />
          <p>{nickname}</p>
        </div>
      </Link>
      <HistoryThumbnail imageUrl={recordImageUrl} missionDuration={duration} />
      <div className={textWrapperCss}>
        <p className={missionNameCss}>{name}</p>
        {remark && <p className={remarkCss}>{remark}</p>}
        <p className={captionCss}>
          13일차 <div className={dotCss} /> 2023년 11월 12일
        </p>
      </div>
    </li>
  );
}

export default FeedItem;

const textWrapperCss = css({
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',

  padding: '20px 4px',
});
const missionNameCss = css({
  textStyle: 'body5',
  color: 'gray.gray600',
});

const remarkCss = css({
  textStyle: 'body2',
  color: 'text.primary',
});

const captionCss = css({
  textStyle: 'body3',
  color: 'text.tertiary',
  display: 'flex',
  gap: '5px',
  alignItems: 'center',
});

const dotCss = css({
  width: '2px',
  height: '2px',
  borderRadius: '50%',
  backgroundColor: 'icon.tertiary',
});

const profileWrapperCss = css({
  display: 'flex',
  alignItems: 'center',
  padding: '16px 12px',
  textStyle: 'body3',
  color: 'text.primary',
  gap: '8px',
  cursor: 'pointer',
});
