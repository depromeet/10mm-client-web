import { type IconHeaderType } from '@/components/Header/Header.types';
import HeaderBase from '@/components/Header/HeaderBase';
import Icon from '@/components/Icon';

function IconHeader({ iconName = 'close', ...props }: IconHeaderType) {
  return (
    <HeaderBase
      rightElement={
        <div>
          <Icon name={iconName} width={20} height={20} />
        </div>
      }
      {...props}
    />
  );
}

export default IconHeader;
