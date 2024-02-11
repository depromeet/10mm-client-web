import { useState } from 'react';
import { useGetReactions } from '@/apis/reaction';
import Icon from '@/components/Icon';
import { reactionBarContainerCss, titleSectionCss } from '@/components/ReactionBar/ReactionBar.style';
import ReactionBottomSheet from '@/components/ReactionBar/ReactionBottomSheet';
import ReactionList from '@/components/ReactionBar/ReactionList';
import { css } from '@/styled-system/css';

interface Props {
  recordId: number;
}

function MyReactionBar(props: Props) {
  const { data } = useGetReactions(props.recordId);
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className={reactionBarContainerCss}>
      <div className={titleSectionCss}>
        <Icon name="navigation-feed-outline" size={20} color="icon.secondary" />
        <span className={textCss}>응원한 사람</span>
      </div>
      <div onClick={() => setIsShowing(true)}>
        <ReactionList data={data} />
      </div>
      <ReactionBottomSheet isShowing={isShowing} data={data} onClose={() => setIsShowing(false)} />
    </div>
  );
}

export default MyReactionBar;

const textCss = css({
  color: 'gray.gray600',
});
