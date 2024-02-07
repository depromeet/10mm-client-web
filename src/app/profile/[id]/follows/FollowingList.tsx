import { useState } from 'react';
import Link from 'next/link';
import { useDeleteFollow } from '@/apis/follow';
import { useGetMembersMe } from '@/apis/member';
import { type FollowerMemberWithStatusType, FollowStatus } from '@/apis/schema/member';
import Button from '@/components/Button/Button';
import { type MemberItemProps, MineMemberItem, NotFollowingMember } from '@/components/ListItem/Follow/MemberItem';
import ProfileListItem from '@/components/ListItem/ProfileListItem';
import { stagger } from '@/components/Motion/Motion.constants';
import StaggerWrapper from '@/components/Motion/StaggerWrapper';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';

interface Props {
  list: FollowerMemberWithStatusType[];
  refetch: () => void;
}

function FollowingList(props: Props) {
  const [viewList, setViewList] = useState(props.list);

  const onFollowing = (member: FollowerMemberWithStatusType) => {
    console.log('member: ', member);
    setViewList((prev) => prev.map((item) => (item.memberId === member.memberId ? member : item)));
    // props.refetch();
  };

  const onFollowingCancel = (member: FollowerMemberWithStatusType) => {
    console.log('member: ', member);
    setViewList((prev) => prev.map((item) => (item.memberId === member.memberId ? member : item)));
  };

  return (
    <StaggerWrapper wrapperOverrideCss={containerCss} staggerVariants={stagger(0.1)}>
      {viewList.map((item) => (
        <Link key={item.memberId} href={ROUTER.PROFILE.DETAIL(item.memberId)} passHref>
          <Item {...item} onFollowingCancel={onFollowingCancel} onFollowing={onFollowing} onUpdateList={onFollowing} />
        </Link>
      ))}
    </StaggerWrapper>
  );
}

export default FollowingList;

function Item({
  // onFollowingCancel,
  onFollowing,
  ...props
}: Omit<MemberItemProps, 'onButtonClick'> & {
  onFollowingCancel: (item: FollowerMemberWithStatusType) => void;
  onFollowing: (item: FollowerMemberWithStatusType) => void;
  onUpdateList: (item: FollowerMemberWithStatusType) => void;
}) {
  const myId = useGetMeId();

  const { mutate } = useDeleteFollow({
    onSuccess: (res) => {
      console.log('res: ', res);
      const data = { ...props, followStatus: res.followStatus ?? FollowStatus.NOT_FOLLOWING };
      console.log('data: ', data);
      props.onUpdateList(data);
      // props.onButtonClick &&
      //   props.onButtonClick({ ...props, followStatus: res.followStatus ?? FollowStatus.NOT_FOLLOWING });
    },
  });

  const onFollowingCancel = () => {
    mutate(props.memberId);
  };

  if (props.memberId === myId) {
    return <MineMemberItem {...props} />;
  }

  if (props.followStatus === FollowStatus.FOLLOWING) {
    return (
      <ProfileListItem
        name={props.nickname}
        buttonElement={
          <Button
            size="small"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              onFollowingCancel();
            }}
          >
            팔로잉
          </Button>
        }
      />
    );
  }

  if (props.followStatus === FollowStatus.NOT_FOLLOWING || props.followStatus === FollowStatus.FOLLOWED_BY_ME) {
    return <NotFollowingMember {...props} onButtonClick={onFollowing} />;
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
