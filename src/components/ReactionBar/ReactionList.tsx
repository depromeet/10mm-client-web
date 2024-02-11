import Image from 'next/image';
import { type GetReactionsResponse } from '@/apis/reaction';
import { type EmojiType, REACTION_EMOJI_IMAGE } from '@/apis/schema/reaction';
import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

type SelectEmojiType = EmojiType | null;

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

export default ReactionList;

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
