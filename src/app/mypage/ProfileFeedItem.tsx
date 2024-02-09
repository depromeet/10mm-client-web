import { type FeedBaseType } from '@/apis/schema/feed';
import FeedThumbnail from '@/app/mypage/FeedThumbnail';
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
