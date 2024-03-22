import { type FeedBaseType } from '@/apis/schema/feed';
import FeedThumbnail from '@/components/ProfileTab/FeedThumbnail';
import { css } from '@styled-system/css';

function ProfileFeedItem(feed: FeedBaseType) {
  return (
    <li className={feedItemCss}>
      <FeedThumbnail imageUrl={feed.recordImageUrl} missionDuration={feed.duration} />
      <div>
        <p className={missionNameCss}>{feed.name}</p>
        <p className={sinceDayCss}>{feed.sinceDay}일차</p>
      </div>
    </li>
  );
}

export default ProfileFeedItem;

export function ProfileFeedItemSkeleton() {
  return (
    <li className={feedItemCss}>
      <div className={skeletonCss} />
      <div>
        <div className={skeletonTextCss} />
      </div>
    </li>
  );
}

const skeletonTextCss = css({
  backgroundColor: 'gray.gray200',
  borderRadius: '8px',
  animation: 'skeleton',
  width: '100px',
  height: '12px',
});

const skeletonCss = css({
  backgroundColor: 'gray.gray200',
  borderRadius: '16px',
  animation: 'skeleton',
  aspectRatio: '1 / 1',
  width: '100%',
  height: '100%',
});

const sinceDayCss = css({
  color: 'gray.gray600',
  textStyle: 'body6',
});

const missionNameCss = css({
  color: 'text.primary',
  textStyle: 'body5',
  marginBottom: '2px',
});

const feedItemCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});
