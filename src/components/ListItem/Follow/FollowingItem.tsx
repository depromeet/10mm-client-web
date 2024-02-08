import { type ComponentProps, type MouseEventHandler } from 'react';
import { FOLLOW_API } from '@/apis/follow';
import Button from '@/components/Button/Button';
import { ProfileListItem } from '@/components/ListItem';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';

interface Props
  extends Omit<ComponentProps<typeof ProfileListItem>, 'buttonElement' | 'subElement' | 'variant' | 'thumbnail'> {
  memberId: number;
  onButtonClick?: () => void;
}

function FollowingItem(props: Props) {
  const { triggerSnackBar } = useSnackBar();

  const onFollowerClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      await FOLLOW_API.deleteFollow(props.memberId);
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
        <Button size="small" variant="secondary" onClick={onFollowerClick}>
          팔로잉
        </Button>
      }
      {...props}
    />
  );
}

export default FollowingItem;
