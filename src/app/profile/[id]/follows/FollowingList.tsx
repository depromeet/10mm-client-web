import Link from 'next/link';
import { useGetMembersMe } from '@/apis/member';
import { type FollowerMemberWithStatusType } from '@/apis/schema/member';
import { ProfileListItem } from '@/components/ListItem';
import FollowerItem from '@/components/ListItem/Follow/FollowerItem';
import FollowingItem from '@/components/ListItem/Follow/FollowingItem';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';

interface Props {
  list: FollowerMemberWithStatusType[];
  refetch: () => void;
}

function FollowingList(props: Props) {
  const onButtonClick = () => {
    props.refetch();
  };

  return (
    <section className={containerCss}>
      {props.list.map((item) => (
        <FollowItem key={item.memberId} item={item} onButtonClick={onButtonClick} />
      ))}
    </section>
  );
}

export default FollowingList;

const containerCss = css({
  padding: '16px',
});

function FollowItem({ item, onButtonClick }: { item: FollowerMemberWithStatusType; onButtonClick: () => void }) {
  const myId = useGetMeId();

  const params = {
    name: item.nickname,
    memberId: item.memberId,
    thumbnail: {
      url: item.profileImageUrl,
      alt: item.nickname,
      variant: 'filled',
      size: 'h36',
    },
    onButtonClick,
  };

  return (
    <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)}>
      {item.memberId === myId ? (
        <ProfileListItem
          buttonElement={<div></div>}
          thumbnail={{
            url: item.profileImageUrl,
            variant: 'filled',
            size: 'h36',
          }}
          name={params.name}
        />
      ) : item.followStatus === 'FOLLOWING' ? (
        <FollowingItem {...params} />
      ) : (
        <FollowerItem followStatus={item.followStatus} {...params} />
      )}
    </Link>
  );
}

const useGetMeId = () => {
  const { data } = useGetMembersMe();
  const memberId = data?.memberId ?? 0;
  return memberId;
};
