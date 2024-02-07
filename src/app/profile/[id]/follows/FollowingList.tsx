import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useGetMembersMe } from '@/apis/member';
import { type FollowerMemberWithStatusType, FollowStatus } from '@/apis/schema/member';
import { sorFollowerList } from '@/app/profile/[id]/follows/index.utils';
import {
  FollowingMember,
  type MemberItemProps,
  MineMemberItem,
  NotFollowingMember,
} from '@/components/ListItem/Follow/MemberItem';
import { stagger } from '@/components/Motion/Motion.constants';
import StaggerWrapper from '@/components/Motion/StaggerWrapper';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';

interface Props {
  list: FollowerMemberWithStatusType[];
  refetch: () => void;
}

function FollowingList(props: Props) {
  const myId = useGetMeId();
  const [viewList, setViewList] = useState(props.list);

  useEffect(() => {
    const sortList = sorFollowerList(props.list, Number(myId));
    setViewList(sortList);
  }, [props.list]);

  const onUpdateList = (member: FollowerMemberWithStatusType) => {
    setViewList((prev) => prev.map((item) => (item.memberId === member.memberId ? member : item)));
  };

  return (
    <StaggerWrapper wrapperOverrideCss={containerCss} staggerVariants={stagger(0.1)}>
      {viewList.map((item) => (
        <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)} passHref>
          <Item {...item} onUpdateList={onUpdateList} />
        </Link>
      ))}
    </StaggerWrapper>
  );
}

export default FollowingList;

interface ItemProps extends Omit<MemberItemProps, 'onButtonClick'> {
  onUpdateList: (item: FollowerMemberWithStatusType) => void;
}

function Item({ onUpdateList, ...props }: ItemProps) {
  const myId = useGetMeId();

  if (props.memberId === myId) {
    return <MineMemberItem {...props} />;
  }

  switch (props.followStatus) {
    case FollowStatus.FOLLOWING:
      return <FollowingMember {...props} onButtonClick={onUpdateList} />;
    case FollowStatus.NOT_FOLLOWING:
    case FollowStatus.FOLLOWED_BY_ME:
      return <NotFollowingMember {...props} onButtonClick={onUpdateList} />;
    default:
      return null;
  }
}

const containerCss = css({
  padding: '16px',
  width: '100%',
});

const useGetMeId = () => {
  const { data } = useGetMembersMe();
  const memberId = data?.memberId ?? 0;
  return memberId;
};
