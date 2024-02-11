import { useGetReactions } from '@/apis/reaction';
import { GradientFeedIcon } from '@/components/Icon/NavigationFeedIcon';
import { reactionBarContainerCss, titleSectionCss } from '@/components/ReactionBar/ReactionBar.style';
import { gradientTextCss } from '@/constants/style/gradient';

interface Props {
  recordId: number;
}

function OtherReactionBar(props: Props) {
  //   const { data } = useGetReactions(props.recordId);

  return (
    <div className={reactionBarContainerCss}>
      <div className={titleSectionCss}>
        <GradientFeedIcon />
        <span className={gradientTextCss}>응원한 사람</span>
      </div>
    </div>
  );
}

export default OtherReactionBar;
