import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetMyId } from '@/apis/member';
import { type GetReactionsResponse, type ReactionType } from '@/apis/reaction';
import { type EmojiType, REACTION_EMOJI_IMAGE } from '@/apis/schema/reaction';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Header from '@/components/Header/Header';
import { OneLineListItem } from '@/components/ListItem';
import { ROUTER } from '@/constants/router';
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
    <>
      <BottomSheet
        headerElement={<Header rightAction="none" title="응원한 사람" />}
        isShowing={props.isShowing}
        onClickOutside={props.onClose}
        isDraggable
      >
        <EmojiList data={props.data} selectedEmoji={selectedEmoji} onSelect={setSelectedEmoji} />
        <PeopleList data={viewReactionList} />
      </BottomSheet>
      {props.isShowing && (
        <div
          className={backDropCss}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            props.onClose();
          }}
        />
      )}
    </>
  );
}

export default ReactionBottomSheet;
const backDropCss = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
});

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
  const { memberId: myId } = useGetMyId();

  return (
    <section className={peopleListSectionCss}>
      {data?.reactions.map((reaction) => (
        <Link
          key={reaction.memberProfile.memberId}
          href={
            myId === reaction.memberProfile.memberId
              ? ROUTER.MYPAGE.HOME
              : ROUTER.PROFILE.DETAIL(reaction.memberProfile.memberId)
          }
        >
          <OneLineListItem.Thumbnail
            name={reaction.memberProfile.nickname}
            // TODO : 리팩토링 필요
            thumbnail={{
              url: reaction.memberProfile.profileImageUrl,
              size: 'h36',
              variant: 'filled',
            }}
          />
        </Link>
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
