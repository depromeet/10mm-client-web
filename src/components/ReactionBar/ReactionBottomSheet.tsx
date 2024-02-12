import { useEffect, useState } from 'react';
import Image from 'next/image';
import { type GetReactionsResponse, type ReactionType } from '@/apis/reaction';
import { type EmojiType, REACTION_EMOJI_IMAGE } from '@/apis/schema/reaction';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Header from '@/components/Header/Header';
import { OneLineListItem } from '@/components/ListItem';
import { hiddenScrollCss } from '@/constants/style/scroll';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  isShowing: boolean;
  onClose: () => void;
  data?: GetReactionsResponse;
}

function ReactionBottomSheet(props: Props) {
  const initEmoji = props.data?.[0]?.emojiType;

  const [selectedEmoji, setSelectedEmoji] = useState(initEmoji);

  useEffect(() => {
    setSelectedEmoji(initEmoji);
  }, [props.data]);

  const viewReactionList = props.data?.find((item) => item.emojiType === selectedEmoji);

  return (
    <BottomSheet
      headerElement={<Header rightAction="none" title="응원한 사람" />}
      isShowing={props.isShowing}
      onClickOutside={props.onClose}
      isDraggable
    >
      <div className={wrapperCss}>
        <EmojiList data={props.data} selectedEmoji={selectedEmoji} onSelect={setSelectedEmoji} />
        <PeopleList data={viewReactionList} />
      </div>
    </BottomSheet>
  );
}

// TODO : bottom sheet content에서 padding이 제거되면 제거 필요
const wrapperCss = css({
  width: '100vw',
  maxW: '475px',
  position: 'relative',
  left: '-16px',
});

export default ReactionBottomSheet;

interface EmojiListProps {
  data?: GetReactionsResponse;
  selectedEmoji?: EmojiType;
  onSelect: (emoji: EmojiType) => void;
}

function EmojiList({ data, selectedEmoji, onSelect }: EmojiListProps) {
  return (
    <section className={cx(emojiListSectionCss, hiddenScrollCss)}>
      {data?.map((item) => (
        <div
          key={item.emojiType}
          className={cx(
            emojiItemCss,
            css({
              backgroundColor: selectedEmoji === item.emojiType ? 'purple.purple100' : 'transparent',
            }),
          )}
          onClick={() => onSelect(item.emojiType)}
        >
          <Image src={REACTION_EMOJI_IMAGE[item.emojiType]} alt={item.emojiType} width={24} height={24} />
          <span>{item.count}</span>
        </div>
      ))}
    </section>
  );
}

const emojiListSectionCss = flex({
  padding: '0 16px 12px',
  gap: '8px',
  overflowX: 'auto',
});

const emojiItemCss = flex({
  gap: '4px',
  alignItems: 'center',
  padding: '6px 12px',
  color: 'text.primary',
  textStyle: 'subtitle3',
  borderRadius: '12px',
  flexShrink: 0,
});

function PeopleList({ data }: { data?: ReactionType }) {
  return (
    <section className={peopleListSectionCss}>
      {data?.reactions.map((reaction) => (
        <OneLineListItem.Thumbnail
          key={reaction.memberProfile.memberId}
          name={reaction.memberProfile.nickname}
          thumbnail={{
            url: reaction.memberProfile.profileImageUrl,
            size: 'h36',
          }}
        />
      ))}
    </section>
  );
}

const peopleListSectionCss = css({
  padding: '8px 0',
  maxHeight: '60vh',
  overflow: 'auto',
  minHeight: '200px',
});
