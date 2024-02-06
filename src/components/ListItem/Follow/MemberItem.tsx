import { FOLLOW_API, useDeleteFollow } from '@/apis/follow';
import { isSeverError } from '@/apis/instance.api';
import { useGetMembersMe } from '@/apis/member';
import { type FollowerMemberWithStatusType, FollowStatus } from '@/apis/schema/member';
import Button from '@/components/Button/Button';
import { ProfileListItem } from '@/components/ListItem';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';

interface MemberItemProps extends FollowerMemberWithStatusType {
  // @param {onButtonClick} 버튼 클릭후 수행할 동작
  onButtonClick?: (memberId: number, actionType?: 'addFollow' | 'deleteFollow') => void;
}

function MemberItem(props: MemberItemProps) {
  const { triggerSnackBar } = useSnackBar();

  const currentLoginMemberId = useGetMeId();
  const isMyself = currentLoginMemberId === props.memberId;

  const onFollowerClick = async () => {
    try {
      await FOLLOW_API.addFollow(props.memberId);
      props.onButtonClick?.(props.memberId);
    } catch (error) {
      if (isSeverError(error)) {
        triggerSnackBar({
          message: error.response.data.data.message,
        });
      }
    }
  };

  const { mutate } = useDeleteFollow({
    onSuccess: () => {
      props.onButtonClick?.(props.memberId, 'deleteFollow');
      triggerSnackBar({
        message: `${props.nickname} 팔로잉이 취소되었습니다.`,
      });
    },
  });

  const onFollowingCancel = async () => {
    mutate(props.memberId);
    // try {
    //   await FOLLOW_API.deleteFollow(props.memberId);
    //   props.onButtonClick?.();
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (error: any) {
    //   triggerSnackBar({
    //     message: error.response.data.data.message,
    //   });
    // }
  };

  if (isMyself) {
    return <ProfileListItem buttonElement={<div></div>} name={props.nickname} />;
  }

  // 팔로잉 되어있는 상태
  if (props.followStatus === FollowStatus.FOLLOWING) {
    return (
      <ProfileListItem
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
        name={props.nickname}
      />
    );
  }

  // 팔로잉 되어있지 않은 상태
  if (props.followStatus === FollowStatus.NOT_FOLLOWING || props.followStatus === FollowStatus.FOLLOWED_BY_ME) {
    return (
      <ProfileListItem
        name={props.nickname}
        buttonElement={
          <Button
            size="small"
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              onFollowerClick();
            }}
          >
            {props.followStatus === 'FOLLOWED_BY_ME' ? '맞팔로우' : '팔로우'}
          </Button>
        }
      />
    );
  }
}

const useGetMeId = () => {
  const { data } = useGetMembersMe();
  const memberId = data?.memberId ?? 0;
  return memberId;
};

export default MemberItem;
