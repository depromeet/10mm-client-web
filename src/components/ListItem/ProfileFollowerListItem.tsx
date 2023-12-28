import Button from '@/components/Button/Button';
import { type ProfileFollowerListItemType } from '@/components/ListItem/ListItem.types';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function ProfileFollowerListItem(props: ProfileFollowerListItemType) {
  return (
    <li className={containerCss}>
      {props.thumbnailElement}
      <p className={nameCss}>
        {props.name}
        <span className={followLabelCss}>팔로우</span>
      </p>
      {props.onButtonClick && (
        <Button size="small" variant="secondary" onClick={props.onButtonClick} className={buttonCss}>
          삭제
        </Button>
      )}
    </li>
  );
}

export default ProfileFollowerListItem;

const containerCss = flex({ padding: '10px 8px', gap: '12px', alignItems: 'center' });

const nameCss = css({
  flex: 1,
  position: 'relative',
  color: 'text.secondary',
  textStyle: 'subtitle4',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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
