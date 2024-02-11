import { useGetReactions } from '@/apis/reaction';
import Icon from '@/components/Icon';
import { reactionBarContainerCss, titleSectionCss } from '@/components/ReactionBar/ReactionBar.style';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  recordId: number;
}

function MyReactionBar(props: Props) {
  const { data } = useGetReactions(props.recordId);
  console.log('data: ', data);

  return (
    <div className={reactionBarContainerCss}>
      <div className={titleSectionCss}>
        <Icon name="navigation-feed-outline" size={20} color="icon.secondary" />
        <span className={textCss}>응원한 사람</span>
      </div>
      <div className={rightSectionCss}>
        {data?.map((reaction) => <div key={reaction.emojiType}>{reaction.emojiType}</div>)}
        <Icon name="arrow-forward" size={12} color="icon.tertiary" />
      </div>
    </div>
  );
}

export default MyReactionBar;

const textCss = css({
  color: 'gray.gray600',
});

const rightSectionCss = flex({
  justifyContent: 'flex-end',
  alignItems: 'center',
  textStyle: 'body6',
  color: 'gray.gray600',
  flex: 1,
  gap: '8px',
});
