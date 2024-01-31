import { type IconHeaderType } from '@/components/Header/Header.types';
import HeaderBase from '@/components/Header/HeaderBase';
import Icon from '@/components/Icon';
import { css } from '@styled-system/css';

function IconHeader({ iconName = 'close', ...props }: IconHeaderType) {
  return (
    <HeaderBase
      rightElement={
        <div className={iconWrapperCss} onClick={props.onIconClick}>
          <Icon name={iconName} width={20} height={20} />
        </div>
      }
      {...props}
    />
  );
}

export default IconHeader;

const iconWrapperCss = css({
  padding: '10px',
  cursor: 'pointer',
  marginRight: '8px',
});
