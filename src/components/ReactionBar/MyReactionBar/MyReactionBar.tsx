import { useState } from 'react';
import { useGetReactions } from '@/apis/reaction';
import Icon from '@/components/Icon';
import { reactionBarContainerCss, titleSectionCss } from '@/components/ReactionBar/ReactionBar.style';
import ReactionBottomSheet from '@/components/ReactionBar/ReactionBottomSheet';
import ReactionList from '@/components/ReactionBar/ReactionList';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { css } from '@/styled-system/css';
import { eventLogger } from '@/utils';

interface Props {
  recordId: number;
}

function MyReactionBar(props: Props) {
  const { triggerSnackBar } = useSnackBar();

  const { data } = useGetReactions(props.recordId);
  const [isReactionBottomSheetShowing, setIsReactionBottomSheetShowing] = useState(false);

  const onOpenReactionBottomSheet = () => {
    if (!data) return;

    if (data.length === 0) {
      // snack bar
      triggerSnackBar({
        message: '아직 응원한 사람이 없습니다.',
        offset: 'appBar',
      });
      return;
    }

    eventLogger.logEvent(EVENT_LOG_CATEGORY.REACTION, EVENT_LOG_NAME.REACTION.OPEN_BOTTOM_SHEET);
    setIsReactionBottomSheetShowing(true);
  };

  return (
    <div className={reactionBarContainerCss}>
      <div className={titleSectionCss}>
        <Icon name="navigation-feed-outline" size={20} color="icon.secondary" />
        <span className={textCss}>응원한 사람</span>
      </div>
      <ReactionList data={data} onClick={onOpenReactionBottomSheet} />
      <ReactionBottomSheet
        isShowing={isReactionBottomSheetShowing}
        data={data}
        onClose={() => setIsReactionBottomSheetShowing(false)}
      />
    </div>
  );
}

export default MyReactionBar;

const textCss = css({
  color: 'gray.gray600',
});
