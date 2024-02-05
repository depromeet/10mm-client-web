import { type ComponentProps, type MouseEventHandler } from 'react';
import { FOLLOW_API } from '@/apis/follow';
import { isSeverError } from '@/apis/instance.api';
import { type FollowStatus } from '@/apis/schema/member';
import Button from '@/components/Button/Button';
import { ProfileListItem } from '@/components/ListItem';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';

interface Props
  extends Omit<ComponentProps<typeof ProfileListItem>, 'buttonElement' | 'subElement' | 'variant' | 'thumbnail'> {
  onButtonClick?: () => void;
  memberId: number;
  followStatus: FollowStatus;
}

function FollowerItem(props: Props) {
  const { triggerSnackBar } = useSnackBar();

  const onFollowerClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      await FOLLOW_API.addFollow(props.memberId);
      props.onButtonClick?.();
    } catch (error) {
      if (isSeverError(error)) {
        triggerSnackBar({
          message: error.response.data.data.message,
        });
      }
    }
  };

  return (
    <ProfileListItem
      buttonElement={
        <Button size="small" variant="primary" onClick={onFollowerClick}>
          {props.followStatus === 'FOLLOWED_BY_ME' ? '맞팔로우' : '팔로우'}
        </Button>
      }
      {...props}
    />
  );
}

export default FollowerItem;
