import { useGetMyId } from '@/apis/member';
import MyReactionBar from '@/components/ReactionBar/MyReactionBar/MyReactionBar';
import OtherReactionBar from '@/components/ReactionBar/OtherReactionBar/OtherReactionBar';

interface Props {
  memberId: number;
  recordId: number;
}

function ReactionBar({ memberId, ...props }: Props) {
  const { memberId: myId } = useGetMyId();
  const isMyFeed = memberId === myId;

  if (isMyFeed) {
    return <MyReactionBar {...props} />;
  }
  return <OtherReactionBar {...props} />;
}

export default ReactionBar;
