import { useState } from 'react';
import Link from 'next/link';
import { type FollowerMemberWithStatusType, FollowStatus } from '@/apis/schema/member';
import MemberItem from '@/components/ListItem/Follow/MemberItem';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';

interface Props {
  list: FollowerMemberWithStatusType[];
  refetch: () => void;
}

function FollowingList(props: Props) {
  const [viewList, setViewList] = useState(props.list);

  const onButtonClick = (memberId: number, actionType?: 'addFollow' | 'deleteFollow') => {
    if (actionType === 'deleteFollow') {
      // TODO : 맞팔인지, 팔로우인지 확인 필요
      setViewList((prev) =>
        prev.map((item) => (item.memberId === memberId ? { ...item, followStatus: FollowStatus.NOT_FOLLOWING } : item)),
      );
      return;
    }
    props.refetch();
  };

  return (
    <section className={containerCss}>
      {props.list.map((item) => (
        <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)} passHref>
          <MemberItem {...item} onButtonClick={onButtonClick} />
        </Link>
      ))}
    </section>
  );
}

export default FollowingList;

const containerCss = css({
  padding: '16px',
});
