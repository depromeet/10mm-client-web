import React from 'react';
import { type FollowDataState } from '@/app/page';
import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { css, cx } from '@styled-system/css';

interface Props {
  name: string;
  id: number | null;
  onClick: (props: FollowDataState) => void;
  selected?: boolean;
  url?: string;
}

function ProfileItem(props: Props) {
  const handleClick = () => {
    if (props.id === null) {
      props.onClick(null);
      return;
    }
    props.onClick({
      followId: props.id,
      nickname: props.name,
    });
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
