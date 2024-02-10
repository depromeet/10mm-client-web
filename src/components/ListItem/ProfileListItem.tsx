import { type ReactNode } from 'react';
import { oneLineTextCss } from '@/components/ListItem/ListItem.styles';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface Props {
  thumbnailUrl?: string;
  name: string;
  variant?: 'one-button' | 'two-button';
  buttonElement: ReactNode;
  subElement?: ReactNode;
}

function ProfileListItem(props: Props) {
  const isExistFollowerButton = props.variant === 'two-button';

  return (
    <li className={containerCss}>
      <Thumbnail size="h36" variant="filled" url={props.thumbnailUrl} />
      <div className={cx(nameCss, oneLineTextCss, isExistFollowerButton && existFollowerButtonCss)}>
        {props.name}
        {props.subElement && (
          <div className={followLabelCss} onClick={(e) => e.preventDefault()}>
            {props.subElement}
          </div>
        )}
      </div>
      <div
        className={buttonCss}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {props.buttonElement}
      </div>
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
  display: 'flex',
});

const existFollowerButtonCss = css({
  paddingRight: '48px',
  width: 'fit-content',
  flex: 0,
});

const buttonCss = css({
  marginLeft: '4px',
});

const followLabelCss = css({
  color: 'purple.purple600',
  textStyle: 'subtitle4',
});
