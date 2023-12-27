import { type ProfileListItemType } from '@/components/ListItem/ListItem.types';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function ProfileListItem(props: ProfileListItemType) {
  return (
    <div className={containerCss}>
      <div className={innerWrapperCss}>
        {props.thumbnailElement}
        <p className={nameCss}>{props.name}</p>
      </div>
      {Boolean(props.buttonElement) && props.buttonElement}
    </div>
  );
}

export default ProfileListItem;

const containerCss = flex({ padding: '10px 8px', gap: '16px', alignItems: 'center' });
const innerWrapperCss = flex({ gap: '12px', alignItems: 'center', flex: 1 });
const nameCss = css({ color: 'text.secondary', textStyle: 'subtitle4', flex: 1 });
