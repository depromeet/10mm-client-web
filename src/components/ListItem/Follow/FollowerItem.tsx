import { type ComponentProps } from 'react';
import { FOLLOW_API } from '@/apis/follow';
import { type FollowStatusType } from '@/apis/schema/member';
import Button from '@/components/Button/Button';
import { ProfileListItem } from '@/components/ListItem';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';

interface Props extends Omit<ComponentProps<typeof ProfileListItem>, 'buttonElement' | 'subElement' | 'variant'> {
  onButtonClick?: () => void;
  memberId: number;
  followStatus: FollowStatusType;
}

function FollowerItem(props: Props) {
  const { triggerSnackBar } = useSnackBar();

  const onFollowerClick = async () => {
    try {
      await FOLLOW_API.addFollow(props.memberId);
      props.onButtonClick?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      triggerSnackBar({
        message: error.response.data.data.message,
      });
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
