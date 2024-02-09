import Link from 'next/link';
import { type FollowerMemberWithStatusType, FollowStatus } from '@/apis/schema/member';
import { useGetMeId, useViewList } from '@/app/profile/[id]/follows/index.hooks';
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
  isFetching: boolean;
}

function FollowingList(props: Props) {
  const { list, onUpdateItem } = useViewList(props.list);

  return (
    <StaggerWrapper wrapperOverrideCss={containerCss} staggerVariants={stagger(0.02)}>
      {list.map((item) => (
        <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)} passHref>
          <Item
            {...item}
            onUpdateList={(_item) => {
              onUpdateItem(_item);
              props.refetch();
            }}
            isLoading={props.isFetching}
          />
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
