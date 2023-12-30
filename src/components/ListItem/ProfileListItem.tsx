import Button from '@/components/Button/Button';
import { type ProfileListItemType } from '@/components/ListItem/ListItem.types';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function ProfileListItem(props: ProfileListItemType) {
  return (
    <li className={containerCss}>
      {props.thumbnailElement}
      <p className={nameCss}>{props.name}</p>
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
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const buttonCss = css({
  marginLeft: '4px',
});
