import React from 'react';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { css, cx } from '@styled-system/css';

function ProfileItem(props: {
  name: string;
  id: number | null;
  onClick: (id: number | null) => void;
  selected?: boolean;
  url?: string;
}) {
  const handleClick = () => {
    props.onClick(props.id);
  };
  return (
    <div className={itemCss} onClick={handleClick}>
      <Thumbnail size="h52" selected={props.selected} url={props.url} variant={props.selected ? 'filled' : 'dimed'} />
      <span
        className={cx(
          nameCss,
          css({
            color: props.selected ? 'text.primary' : 'text.tertiary',
          }),
        )}
      >
        {props.name}
      </span>
    </div>
  );
}

export default React.memo(ProfileItem);

const itemCss = css({
  cursor: 'pointer',
});

const nameCss = css({
  textAlign: 'center',
  overflow: 'hidden',
  maxWidth: '52px',
  width: '100%',
  display: 'block',
  textOverflow: 'ellipsis',
  marginTop: '6px',
  textStyle: 'body6',
});
