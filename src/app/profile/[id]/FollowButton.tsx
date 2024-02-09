import { FOLLOW_API, useAddFollow, useDeleteFollow } from '@/apis/follow';
import getQueryKey from '@/apis/getQueryKey';
import { FollowStatus } from '@/apis/schema/member';
import Button from '@/components/Button/Button';
import GradientTextButton from '@/components/Button/GradientTextButton';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { eventLogger } from '@/utils';
import { css } from '@styled-system/css';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  followStatus: FollowStatus;
  memberId: number;
  isFetching: boolean;
}

function FollowButton({ followStatus, memberId, isFetching: isListLoading }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync: followMutate, isPending: isFollowPending } = useAddFollow({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('followsCountTargetId', { followId: memberId }),
      });
    },
  });

  const { mutateAsync: unFollowMutate, isPending: isUnFollowPending } = useDeleteFollow({
    mutationFn: FOLLOW_API.deleteFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey('followsCountTargetId', { followId: memberId }),
      });
    },
  });

  const handleFollow = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.FOLLOW_PROFILE, EVENT_LOG_NAME.FOLLOW_PROFILE.CLICK_FOLLOW_BUTTON);
    followMutate(memberId);
  };

  const handleUnfollow = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.FOLLOW_PROFILE, EVENT_LOG_NAME.FOLLOW_PROFILE.CLICK_UNFOLLOW_BUTTON);
    unFollowMutate(memberId);
  };

  switch (followStatus) {
    case FollowStatus.FOLLOWING:
      return (
        <Button
          onClick={handleUnfollow}
          variant="primary"
          size={'small'}
          className={followingButtonCss}
          blocked={isUnFollowPending || isListLoading}
        >
          팔로잉
        </Button>
      );

    case FollowStatus.FOLLOWED_BY_ME:
    case FollowStatus.NOT_FOLLOWING:
      return (
        <GradientTextButton onClick={handleFollow} blocked={isFollowPending || isListLoading}>
          {followStatus === FollowStatus.FOLLOWED_BY_ME ? '맞팔로우' : '팔로우'}
        </GradientTextButton>
      );
  }
}

const followingButtonCss = css({
  border: '1px solid',
  borderColor: 'gray.gray500',
  borderRadius: '20px',
  backgroundColor: 'transparent !',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'gray.gray800',
  height: '30px',
  padding: '6px 12px',
  fontSize: '13px',
});

export default FollowButton;
