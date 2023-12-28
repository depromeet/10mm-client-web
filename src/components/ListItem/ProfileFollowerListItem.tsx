import Button from '@/components/Button/Button';
import { type ProfileFollowerListItemType } from '@/components/ListItem/ListItem.types';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function ProfileFollowerListItem(props: ProfileFollowerListItemType) {
  return (
    <li className={containerCss}>
      <div className={innerWrapperCss}>
        {props.thumbnailElement}
        <p className={nameCss}>
          {props.name} <span className={followLabelCss}>팔로우</span>
        </p>
      </div>
      {props.onButtonClick && (
        <Button size="small" variant="secondary" onClick={props.onButtonClick}>
          삭제
        </Button>
      )}
    </li>
  );
}

export default ProfileFollowerListItem;

const containerCss = flex({ padding: '10px 8px', gap: '16px', alignItems: 'center' });
const innerWrapperCss = flex({ gap: '12px', alignItems: 'center', flex: 1 });
const nameCss = css({ color: 'text.secondary', textStyle: 'subtitle4' });
const followLabelCss = css({ color: 'purple.purple600', textStyle: 'subtitle4', marginLeft: '8px' });
