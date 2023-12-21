import { type ComponentProps } from 'react';
import Header from '@/components/Header/Header';
import Icon, { type IconComponentMap } from '@/components/Icon';

interface Props extends Omit<ComponentProps<typeof Header>, 'rightElement'> {
  iconName?: keyof typeof IconComponentMap;
}

function IconHeader({ iconName = 'close', ...props }: Props) {
  return (
    <Header
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
