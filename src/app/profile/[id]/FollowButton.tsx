import { FOLLOW_API } from '@/apis/follow';
import getQueryKey from '@/apis/getQueryKey';
import { isSeverError } from '@/apis/instance.api';
import { FollowStatus } from '@/apis/schema/member';
import Button from '@/components/Button/Button';
import GradientTextButton from '@/components/Button/GradientTextButton';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { css } from '@styled-system/css';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function FollowButton({ followStatus, memberId }: { followStatus: FollowStatus; memberId: number }) {
  const { triggerSnackBar } = useSnackBar();
  const queryClient = useQueryClient();
  const { mutateAsync: followMutate } = useMutation({
    mutationFn: FOLLOW_API.addFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('followsCountTargetId', { followId: memberId }),
      });
    },
    onError: (e) => {
      if (isSeverError(e)) {
        triggerSnackBar({
          message: e.response.data.data.message,
        });
      }
    },
  });

  const { mutateAsync: unFollowMutate } = useMutation({
    mutationFn: FOLLOW_API.deleteFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('followsCountTargetId', { followId: memberId }),
      });
    },
    onError: (e) => {
      if (isSeverError(e)) {
        triggerSnackBar({
          message: e.response.data.data.message,
        });
      }
    },
  });

  const handleFollow = async () => {
    await followMutate(memberId);
  };

  const handleUnfollow = async () => {
    await unFollowMutate(memberId);
  };
  switch (followStatus) {
    case FollowStatus.FOLLOWED_BY_ME:
      return <GradientTextButton onClick={handleFollow}>맞팔로우</GradientTextButton>;
    case FollowStatus.FOLLOWING:
      return (
        <Button onClick={handleUnfollow} variant="primary" size={'small'} className={followingButtonCss}>
          팔로잉
        </Button>
      );
    case FollowStatus.NOT_FOLLOWING:
      return <GradientTextButton onClick={handleFollow}>팔로우</GradientTextButton>;
  }
}

const followingButtonCss = css({
  border: '1px solid',
  borderColor: 'gray.gray500',
  borderRadius: '20px',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'gray.gray800',
  height: '30px',
  padding: '6px 12px',
  fontSize: '13px',
});

export default FollowButton;
