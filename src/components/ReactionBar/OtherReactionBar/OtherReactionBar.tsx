import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useGetMembersMe } from '@/apis/member';
import { type GetReactionsResponse, useAddReaction, useGetReactions, useModifyReaction } from '@/apis/reaction';
import { type EmojiType, REACTION_EMOJI_IMAGE, REACTION_EMOJI_LIST } from '@/apis/schema/reaction';
import { GradientFeedIcon } from '@/components/Icon/NavigationFeedIcon';
import MotionDiv from '@/components/Motion/MotionDiv';
import { reactionBarContainerCss, titleSectionCss } from '@/components/ReactionBar/ReactionBar.style';
import ReactionBottomSheet from '@/components/ReactionBar/ReactionBottomSheet';
import ReactionList from '@/components/ReactionBar/ReactionList';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { gradientTextCss } from '@/constants/style/gradient';
import useOutsideClick from '@/hooks/useOutsideClick';
import { css } from '@/styled-system/css';
import { eventLogger } from '@/utils';
import { NATIVE_METHODS } from '@/utils/nativeMethod';
import { AnimatePresence, motion } from 'framer-motion';

type SelectEmojiType = EmojiType | null;

interface Props {
  recordId: number;
}

function OtherReactionBar(props: Props) {
  const { data, refetch, isLoading } = useGetReactions(props.recordId);
  const [selectEmoji, setSelectEmoji] = useState<SelectEmojiType>();

  const [isOpen, setIsOpen] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  const { myReactionId, myEmoji } = useGetMyReactions(data as GetReactionsResponse);

  const onOpenReactionBottomSheet = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.REACTION, EVENT_LOG_NAME.REACTION.OPEN_BOTTOM_SHEET);
    setIsShowing(true);
  };

  const { mutate } = useAddReaction({
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      setSelectEmoji(myEmoji);
    },
  });

  const { mutate: modifyMutate } = useModifyReaction({
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      setSelectEmoji(myEmoji);
    },
  });

  const onSelectEmoji = (emoji: EmojiType) => {
    setSelectEmoji(emoji);
    NATIVE_METHODS.HAPTIC();

    if (myReactionId) {
      eventLogger.logEvent(EVENT_LOG_CATEGORY.REACTION, EVENT_LOG_NAME.REACTION.MODIFY_EMOJI);
      modifyMutate({ reactionId: myReactionId, emojiType: emoji });
    } else {
      eventLogger.logEvent(EVENT_LOG_CATEGORY.REACTION, EVENT_LOG_NAME.REACTION.CLICK_EMOJI);
      mutate({ missionRecordId: props.recordId, emojiType: emoji });
    }
  };

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  });

  useEffect(() => {
    setSelectEmoji(myEmoji);
  }, [isLoading]);

  return (
    <div className={reactionBarContainerCss} ref={ref}>
      <div className={titleSectionCss} onClick={() => setIsOpen((prev) => !prev)}>
        <GradientFeedIcon />
        <span className={gradientTextCss}>응원하기</span>
      </div>
      <ReactionList data={data} selectEmoji={selectEmoji} onClick={onOpenReactionBottomSheet} />
      <ReactSelect
        selectEmoji={selectEmoji}
        onSelect={onSelectEmoji}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <ReactionBottomSheet isShowing={isShowing} data={data} onClose={() => setIsShowing(false)} />
    </div>
  );
}

export default OtherReactionBar;

type GetMyReactionsResponse = Record<string, number>;

const useGetMyReactions = (
  response: GetReactionsResponse,
): {
  myReactionId: number | null;
  myEmoji: SelectEmojiType;
} => {
  const { data } = useGetMembersMe();
  const memberId = data?.memberId;

  if (!response || !memberId)
    return {
      myReactionId: null,
      myEmoji: null,
    };

  const myReaction: GetMyReactionsResponse = {};
  const myEmojis: EmojiType[] = [];

  for (const item of response) {
    for (const reaction of item.reactions) {
      if (reaction.memberProfile.memberId === memberId) {
        myReaction[item.emojiType] = reaction.reactionId;
        myEmojis.push(item.emojiType);

        return { myEmoji: item.emojiType, myReactionId: reaction.reactionId };
      }
    }
  }

  return { myReactionId: null, myEmoji: null };
};

interface ReactSelectProps {
  selectEmoji?: SelectEmojiType;
  onSelect: (emoji: EmojiType) => void;
  isOpen: boolean;
  onClose: () => void;
}

function ReactSelect(props: ReactSelectProps) {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.article
          className={reactionSelectCss}
          variants={reactionVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className={innerCss}>
            {REACTION_EMOJI_LIST.map((emoji: EmojiType) => {
              const isSelect = props.selectEmoji?.includes(emoji);
              return (
                <div
                  key={emoji}
                  className={emojiItemCss}
                  onClick={() => {
                    props.onSelect(emoji);
                    // props.onClose(); // TODO: 기획서에 없는 내용 확인 필요
                  }}
                >
                  {isSelect && <MotionDiv className={selectCircleCss} />}
                  <Image src={REACTION_EMOJI_IMAGE[emoji]} alt={emoji} width={28} height={28} />
                </div>
              );
            })}
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
}

const reactionVariant = {
  initial: { scale: 0, opacity: 0.7 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500, // Tension
      damping: 25, // Friction
      duration: 0.5,
      transformOrigin: 'bottom left',
    },
  },
  exit: { opacity: 0.7, scale: 0, transition: { ease: 'easeInOut', duration: 0.3 } },
};

const innerCss = css({
  display: 'flex',
  padding: '10px 12px',
  flexWrap: 'wrap',
  maxWidth: '224px',
});

const reactionSelectCss = css({
  backgroundColor: '#201E28',
  border: '1px solid',
  borderColor: 'purple.purple100',
  boxShadow: '0px 5px 50px 4px #5C4E7A4D inset',
  position: 'absolute',
  bottom: '100%',
  marginBottom: '8px',
  left: 0,
  borderRadius: '20px',
  transformOrigin: 'bottom left',
});

const emojiItemCss = css({
  position: 'relative',
  padding: '6px',
  cursor: 'pointer',
  width: '40px',
  height: '40px',

  '& img': {
    position: 'relative',
    zIndex: 1,
    width: '28px',
    height: '28px',
  },
});

const selectCircleCss = css({
  background: '#312E3FE5',
  borderRadius: '50%',
  pointerEvents: 'none',
  position: 'absolute',
  boxShadow: '0px 5.625px 56.25px 4.5px #5C4E7A4D inset',
  width: '36px',
  height: '36px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 0,
});
