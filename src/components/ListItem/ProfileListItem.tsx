import { type ReactNode } from 'react';
import { oneLineTextCss } from '@/components/ListItem/ListItem.styles';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { type ThumbnailProps } from '@/components/Thumbnail/Thumbnail.types';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  thumbnail?: ThumbnailProps;
  name: string;
  variant?: 'one-button' | 'two-button';
  buttonElement: ReactNode;
  subElement?: ReactNode;
}

function ProfileListItem(props: Props) {
  const isExistFollowerButton = props.variant === 'two-button';

  return (
    <li className={containerCss}>
      <Thumbnail size="h36" {...props.thumbnail} />
      <p className={cx(nameCss, oneLineTextCss, isExistFollowerButton && existFollowerButtonCss)}>
        {props.name}
        {props.subElement && <div className={followLabelCss}>{props.subElement}</div>}
      </p>
      <div className={buttonCss} onClick={(e) => e.stopPropagation()}>
        {props.buttonElement}
      </div>
    </li>
  );
}

export default ProfileListItem;

export function ProfileItemSkeleton() {
  return <div className={skeletonCss} />;
}

const skeletonCss = css({
  animation: 'skeleton',
  height: '56px',
  width: '100%',
  backgroundColor: 'bg.surface4',
  borderRadius: '12px',
  marginBottom: '8px',
});

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
