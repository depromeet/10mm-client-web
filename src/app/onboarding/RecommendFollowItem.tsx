import React from 'react';
import Button from '@/components/Button/Button';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { css } from '@styled-system/css';

interface RecommendFollowItemProps {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  tags: string[];
  onChangeFollow: (id: number) => void;
  isFollowing: boolean;
}

function RecommendFollowItem({
  profileImageUrl,
  nickname,
  tags,
  onChangeFollow,
  isFollowing,
  id,
}: RecommendFollowItemProps) {
  const handleFollow = () => {
    onChangeFollow(id);
  };

  return (
    <div className={followItemWrapperCss}>
      <div className={leftWrapperCss}>
        <Thumbnail size={'h36'} variant={'filled'} url={profileImageUrl} />
        <div>
          <p className={nicknameCss}>{nickname}</p>
          <ul className={tagListCss}>
            {tags.map((tag, index) => (
              <li className={tagCss} key={index}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button onClick={handleFollow} size={'small'} variant={isFollowing ? 'secondary' : 'primary'}>
        {isFollowing ? '팔로우' : '팔로잉'}
      </Button>
    </div>
  );
}

export default React.memo(RecommendFollowItem);

const leftWrapperCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const nicknameCss = css({
  textStyle: 'subtitle4',
  color: 'text.secondary',
});
const tagListCss = css({
  display: 'flex',
  gap: '6px',
});

const tagCss = css({
  textStyle: 'body6',
  color: 'text.tertiary',
});

const followItemWrapperCss = css({
  display: 'flex',
  justifyContent: 'space-between',

  width: '100%',
  padding: '8px',
});
