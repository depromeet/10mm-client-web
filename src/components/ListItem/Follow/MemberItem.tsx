import { useAddFollow, useDeleteFollow } from '@/apis/follow';
import { type FollowerMemberWithStatusType, FollowStatus } from '@/apis/schema/member';
import Button from '@/components/Button/Button';
import { ProfileListItem } from '@/components/ListItem';

export interface MemberItemProps extends FollowerMemberWithStatusType {
  onButtonClick?: (item: FollowerMemberWithStatusType) => void;

  onClick?: (item: FollowerMemberWithStatusType) => void;
}

export function FollowingMember({ onClick, ...props }: MemberItemProps) {
  const { mutate } = useDeleteFollow({
    onSuccess: (res) => {
      // TODO : 서버 데이터 잘 받아오는지 체크
      const newStatus = res?.followStatus ?? FollowStatus.NOT_FOLLOWING;
      props.onButtonClick?.({ ...props, followStatus: newStatus });
    },
  });

  const onFollowingCancel = async () => {
    mutate(props.memberId);
  };

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

// 팔로잉 되어있지 않은 멤버
export function NotFollowingMember(props: MemberItemProps) {
  const { mutate } = useAddFollow({
    onSuccess: () => {
      props.onButtonClick?.({ ...props, followStatus: FollowStatus.FOLLOWING });
    },
  });

  const onFollowerClick = async () => {
    mutate(props.memberId);
  };

  return (
    <ProfileListItem
      name={props.nickname}
      thumbnailUrl={props.profileImageUrl}
      buttonElement={
        <Button
          size="small"
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            onFollowerClick();
          }}
        >
          {props.followStatus === FollowStatus.FOLLOWED_BY_ME ? '맞팔로우' : '팔로우'}
        </Button>
      }
    />
  );
}

export function MineMemberItem(props: MemberItemProps) {
  return <ProfileListItem name={props.nickname} buttonElement={<div></div>} />;
}
