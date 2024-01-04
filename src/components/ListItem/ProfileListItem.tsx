import { type MouseEventHandler } from 'react';
import Button from '@/components/Button/Button';
import { oneLineTextCss } from '@/components/ListItem/ListItem.styles';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { type ThumbnailProps } from '@/components/Thumbnail/Thumbnail.types';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  thumbnail?: ThumbnailProps;
  name: string;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;

  variant?: 'one-button' | 'two-button';
  onSubButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

function ProfileListItem(props: Props) {
  const isExistFollowerButton = props.variant === 'two-button';

  return (
    <li className={containerCss}>
      <Thumbnail size="h36" {...props.thumbnail} />
      <p className={cx(nameCss, oneLineTextCss, isExistFollowerButton && existFollowerButtonCss)}>
        {props.name}
        {isExistFollowerButton && (
          <span className={followLabelCss} onClick={props.onSubButtonClick}>
            팔로우
          </span>
        )}
      </p>
      {props.onButtonClick && (
        <Button size="small" variant="primary" onClick={props.onButtonClick} className={buttonCss}>
          팔로우
        </Button>
      )}
    </li>
  );
}

export default ProfileListItem;

const containerCss = flex({ padding: '10px 8px', gap: '12px', alignItems: 'center' });

const nameCss = css({
  flex: 1,
  color: 'text.secondary',
  textStyle: 'subtitle4',
  position: 'relative',
});

const existFollowerButtonCss = css({
  paddingRight: '48px',
});

const buttonCss = css({
  marginLeft: '4px',
});

const followLabelCss = css({
  top: 0,
  right: 0,
  position: 'absolute',
  color: 'purple.purple600',
  textStyle: 'subtitle4',
});
