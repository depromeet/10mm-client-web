import Image from 'next/image';
import Link from 'next/link';
import { useGetReactions } from '@/apis/reaction';
import { type MissionItemTypeWithRecordId } from '@/apis/schema/mission';
import { REACTION_EMOJI_IMAGE } from '@/apis/schema/reaction';
import { TwoLineListItem } from '@/components/ListItem';
import MissionBadge from '@/components/MissionList/Badge';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { css } from '@/styled-system/css';

interface Props extends MissionItemTypeWithRecordId {
  href: string;
  onClick?: () => void; // link click event

  recordId: number;
}

function ReactionLinkItem({ onClick, href, ...props }: Props) {
  if (!href)
    return (
      <div onClick={onClick}>
        <ReactionItem {...props} />
      </div>
    );

  return (
    <Link href={href} onClick={onClick}>
      <ReactionItem {...props} />
    </Link>
  );
}

export default ReactionLinkItem;

function ReactionItem(props: Omit<Props, 'href' | 'onClick'>) {
  return (
    <TwoLineListItem
      badgeElement={<MissionBadge status={props.missionStatus} />}
      name={props.name}
      subName={MISSION_CATEGORY_LABEL[props.category].label}
      imageUrl={MISSION_CATEGORY_LABEL[props.category].imgUrl}
    >
      <ReactionList recordId={props.recordId} />
    </TwoLineListItem>
  );
}

function ReactionList({ recordId }: { recordId: number }) {
  const { data } = useGetReactions(recordId);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className={reactionListCss}>
      {data.map((item) => (
        <div key={item.emojiType} className={reactionItemCss}>
          <Image src={REACTION_EMOJI_IMAGE[item.emojiType]} alt={item.emojiType} width={16} height={16} />
          <span>{item.count}</span>
        </div>
      ))}
    </div>
  );
}

const reactionListCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const reactionItemCss = css({
  display: 'flex',
  alignItems: 'center',
  color: 'gray.gray600',
  textStyle: 'body6',
  userSelect: 'none',
  gap: '3px',
});
