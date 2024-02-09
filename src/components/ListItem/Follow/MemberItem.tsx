import { useAddFollow, useDeleteFollow } from '@/apis/follow';
import { type FollowerMemberWithStatusType, FollowStatus } from '@/apis/schema/member';
import Button from '@/components/Button/Button';
import { ProfileListItem } from '@/components/ListItem';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { css } from '@/styled-system/css';
import { eventLogger } from '@/utils';

export interface MemberItemProps extends FollowerMemberWithStatusType {
  onButtonClick?: (item: FollowerMemberWithStatusType) => void;
  isLoading?: boolean;
  onClick?: (item: FollowerMemberWithStatusType) => void;
}

export function FollowingMember({ onClick, ...props }: MemberItemProps) {
  const { mutate, isPending } = useDeleteFollow({
    onSuccess: (res) => {
      // TODO : 서버 데이터 잘 받아오는지 체크
      const newStatus = res?.followStatus ?? FollowStatus.NOT_FOLLOWING;
      props.onButtonClick?.({ ...props, followStatus: newStatus });
    },
  });

  const isButtonDisabled = isPending || props.isLoading;

  const onFollowingCancel = async () => {
    mutate(props.memberId);
  };

  return (
    <ProfileListItem
      name={props.nickname}
      thumbnailUrl={props.profileImageUrl}
      buttonElement={
        <Button
          size="small"
          variant="secondary"
          onClick={onFollowingCancel}
          disabled={isButtonDisabled}
          className={secondaryButtonCss}
        >
          팔로잉
        </Button>
      }
    />
  );
}

const secondaryButtonCss = css({
  '&:disabled': {
    filter: 'none',
    backgroundColor: 'gray.gray200',
    color: 'text.secondary',
  },
});

// 팔로잉 되어있지 않은 멤버
export function NotFollowingMember(props: MemberItemProps) {
  const { mutate, isPending } = useAddFollow({
    onSuccess: () => {
      props.onButtonClick?.({ ...props, followStatus: FollowStatus.FOLLOWING });
    },
  });

  const isButtonDisabled = isPending || props.isLoading;

  const onFollowerClick = async () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.FOLLOW_LIST, EVENT_LOG_NAME.FOLLOW_LIST.CLICK_FOLLOW_BUTTON);
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
          onClick={onFollowerClick}
          disabled={isButtonDisabled}
          className={primaryButtonCss}
        >
          {props.followStatus === FollowStatus.FOLLOWED_BY_ME ? '맞팔로우' : '팔로우'}
        </Button>
      }
    />
  );
}

const primaryButtonCss = css({
  '&:disabled': {
    filter: 'none',
  },
});

export function MineMemberItem(props: MemberItemProps) {
  return <ProfileListItem name={props.nickname} buttonElement={<div></div>} thumbnailUrl={props.profileImageUrl} />;
}
