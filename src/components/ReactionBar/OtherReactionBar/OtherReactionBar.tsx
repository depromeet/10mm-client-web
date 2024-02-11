import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useGetMembersMe } from '@/apis/member';
import { type GetReactionsResponse, useAddReaction, useGetReactions, useModifyReaction } from '@/apis/reaction';
import { type EmojiType, REACTION_EMOJI_IMAGE, REACTION_EMOJI_LIST } from '@/apis/schema/reaction';
import Icon from '@/components/Icon';
import { GradientFeedIcon } from '@/components/Icon/NavigationFeedIcon';
import MotionDiv from '@/components/Motion/MotionDiv';
import { reactionBarContainerCss, titleSectionCss } from '@/components/ReactionBar/ReactionBar.style';
import { gradientTextCss } from '@/constants/style/gradient';
import useOutsideClick from '@/hooks/useOutsideClick';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { AnimatePresence, motion } from 'framer-motion';

type SelectEmojiType = EmojiType | null;

interface Props {
  recordId: number;
}

function OtherReactionBar(props: Props) {
  const { data, refetch, isLoading } = useGetReactions(props.recordId);
  const [selectEmoji, setSelectEmoji] = useState<SelectEmojiType>();
  const [isOpen, setIsOpen] = useState(false);

  const { myReactionId, myEmoji } = useGetMyReactions(data as GetReactionsResponse);

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

    if (myReactionId) {
      modifyMutate({ reactionId: myReactionId, emojiType: emoji });
    } else {
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
      <ReactionList data={data} selectEmoji={selectEmoji} />
      <ReactSelect
        selectEmoji={selectEmoji}
        onSelect={onSelectEmoji}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
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

interface ReactionListProps {
  data?: GetReactionsResponse;
  selectEmoji?: SelectEmojiType;
}

function ReactionList({ data, selectEmoji }: ReactionListProps) {
  return (
    <div className={reactionListCss}>
      <div className={reactionListInnerCss}>
        {data?.map((reaction) => {
          const isSelectReaction = selectEmoji?.includes(reaction.emojiType);

          return (
            <div key={reaction.emojiType} className={reactItemCss}>
              <Image
                src={REACTION_EMOJI_IMAGE[reaction.emojiType as EmojiType]}
                alt={reaction.emojiType}
                width={16}
                height={16}
              />
              <span
                className={css({
                  color: isSelectReaction ? 'purple.purple600' : 'gray.gray600',
                })}
              >
                {reaction.count}
              </span>
            </div>
          );
        })}
      </div>
      <Icon name="arrow-forward" size={12} color="icon.tertiary" />
    </div>
  );
}

const reactionListCss = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '10px 0',
  flex: 1,
});

const reactionListInnerCss = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'flex-end',
  maxWidth: '210px',
  flexWrap: 'wrap',
});

const reactItemCss = flex({
  alignItems: 'center',
  gap: '3px',
  flexShrink: 0,
});

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
                <div key={emoji} className={emojiItemCss} onClick={() => props.onSelect(emoji)}>
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
});

const reactionSelectCss = css({
  // backgroundColor: 'purple.purple100',
  background:
    'linear-gradient(0deg, rgba(32, 30, 40, 0.9), rgba(32, 30, 40, 0.9)), linear-gradient(0deg, token(purple.purple100), token(purple.purple100))',
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
