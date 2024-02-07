import { useState } from 'react';
import Link from 'next/link';
import { useGetMembersMe } from '@/apis/member';
import { type FollowerMemberWithStatusType, FollowStatus } from '@/apis/schema/member';
import {
  FollowingMember,
  type MemberItemProps,
  MineMemberItem,
  NotFollowingMember,
} from '@/components/ListItem/Follow/MemberItem';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';

interface Props {
  list: FollowerMemberWithStatusType[];
  refetch: () => void;
}

function FollowingList(props: Props) {
  const [viewList, setViewList] = useState(props.list);

  const onFollowingCancel = (member: FollowerMemberWithStatusType) => {
    setViewList((prev) => prev.map((item) => (item.memberId === member.memberId ? member : item)));
  };

  return (
    <section className={containerCss}>
      {viewList.map((item) => (
        <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)} passHref>
          <Item {...item} onFollowingCancel={onFollowingCancel} />
        </Link>
      ))}
    </section>
  );
}

export default FollowingList;
function Item({
  onFollowingCancel,
  ...props
}: Omit<MemberItemProps, 'onButtonClick'> & { onFollowingCancel: (item: FollowerMemberWithStatusType) => void }) {
  const myId = useGetMeId();

  if (props.memberId === myId) {
    return <MineMemberItem {...props} />;
  }

  if (props.followStatus === FollowStatus.FOLLOWING) {
    return <FollowingMember {...props} onButtonClick={onFollowingCancel} />;
  }

  if (props.followStatus === FollowStatus.NOT_FOLLOWING || props.followStatus === FollowStatus.FOLLOWED_BY_ME) {
    return <NotFollowingMember {...props} />;
  }
}

const containerCss = css({
  padding: '16px',
});

const useGetMeId = () => {
  const { data } = useGetMembersMe();
  const memberId = data?.memberId ?? 0;
  return memberId;
};
