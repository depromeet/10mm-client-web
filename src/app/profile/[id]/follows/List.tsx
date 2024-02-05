import Link from 'next/link';
import { type FollowerMemberWithStatusType } from '@/apis/schema/member';
import FollowerItem from '@/components/ListItem/Follow/FollowerItem';
import FollowingItem from '@/components/ListItem/Follow/FollowingItem';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';

interface Props {
  list: FollowerMemberWithStatusType[];
  refetch: () => void;
}

function FollowerList(props: Props) {
  const onButtonClick = () => {
    props.refetch();
  };

  return (
    <section className={container}>
      {props.list.map((item) => (
        <FollowItem key={item.memberId} item={item} onButtonClick={onButtonClick} />
      ))}
    </section>
  );
}

export default FollowerList;

const container = css({
  padding: '16px',
});

function FollowItem({ item, onButtonClick }: { item: FollowerMemberWithStatusType; onButtonClick: () => void }) {
  const params = {
    name: item.nickname,
    memberId: item.memberId,
    thumbnail: {
      url: item.profileImageUrl,
      alt: item.nickname,
      variant: 'filled',
    },
    onButtonClick,
  };
  return (
    <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)}>
      {item.followStatus === 'FOLLOWING' ? (
        <FollowingItem {...params} />
      ) : (
        <FollowerItem followStatus={item.followStatus} {...params} />
      )}
    </Link>
  );
}
