'use client';

import Link from 'next/link';
import { useGetMyId } from '@/apis/member';
import { type FeedItemType } from '@/apis/schema/feed';
import ReactionBar from '@/components/ReactionBar/ReactionBar';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import HistoryThumbnail from '@/pages/feed/HistoryThumbnail';
import { eventLogger } from '@/utils';
import { css } from '@styled-system/css';
import dayjs from 'dayjs';

function FeedItem({
  sinceDay,
  remark,
  nickname,
  memberId,
  name,
  profileImage,
  recordImageUrl,
  duration,
  recordStartedAt,
  recordId,
}: FeedItemType) {
  const { memberId: myId } = useGetMyId();
  const isMyFeed = memberId === myId;

  const handleClickFeedItem = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.FEED, EVENT_LOG_NAME.FEED.CLICK_FEED);
  };

  const handleClickFollowProfile = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.FEED, EVENT_LOG_NAME.FEED.CLICK_PROFILE);
  };

  return (
    <li>
      <Link href={ROUTER.PROFILE.DETAIL(memberId)} onClick={handleClickFollowProfile}>
        <div className={profileWrapperCss}>
          <Thumbnail size={'h24'} variant={'filled'} url={profileImage} />
          <p>{nickname}</p>
        </div>
      </Link>

      <HistoryThumbnail imageUrl={recordImageUrl} missionDuration={duration} />
      <Link
        href={
          isMyFeed ? ROUTER.RECORD.DETAIL.HOME(recordId.toString()) : ROUTER.RECORD.DETAIL.FOLLOW(recordId.toString())
        }
        onClick={handleClickFeedItem}
      >
        <div className={textWrapperCss}>
          <p className={missionNameCss}>{name}</p>
          {remark && <p className={remarkCss}>{remark}</p>}
          <p className={captionCss}>
            {sinceDay}일차 <div className={dotCss} /> {dayjs(recordStartedAt).format('YYYY년 MM월 DD일')}
          </p>
        </div>
      </Link>
      <ReactionBar memberId={memberId} recordId={recordId} />
    </li>
  );
}

export default FeedItem;

export const FeedSkeletonItem = () => {
  return (
    <li>
      <div className={profileWrapperCss}>
        <Thumbnail size={'h24'} variant={'filled'} url={null} />
        <div
          className={css(
            { ...skeletonTextCss },
            {
              width: '80px',
              height: '20px',
            },
          )}
        />
      </div>
      <div className={profile} />
      <div className={textWrapperCss}>
        <div
          className={css(
            { ...skeletonTextCss },
            {
              width: '80px',
              height: '17px',
            },
          )}
        />
        <div
          className={css(
            { ...skeletonTextCss },
            {
              width: '130px',
              height: '20px',
            },
          )}
        />
      </div>
    </li>
  );
};

const profile = css({
  animation: 'skeleton',
  backgroundColor: 'bg.surface4',
  width: '100%',
  aspectRatio: '1 / 1',
  position: 'relative',
  borderRadius: '22px',
  overflow: 'hidden',
  maxWidth: 'calc(475px - 32px)',
  maxHeight: 'calc(475px - 32px)',
});

const skeletonTextCss = {
  animation: 'skeleton',
  backgroundColor: 'bg.surface4',
  borderRadius: '12px',
};

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
  display: 'block',
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
