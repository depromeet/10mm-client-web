import { css, cx } from '@/styled-system/css';

import { type TabPartsProps } from './Tab.types';

export default function TabParts({ tabName, id, isActive, onTabClick }: TabPartsProps) {
  const handleClick = () => {
    onTabClick({
      id,
      tabName,
    });
  };

  return (
    <div
      className={cx(
        tabNameCss,
        css({
          color: isActive ? 'purple.purple700' : 'gray.gray500',
          borderColor: isActive ? 'purple.purple700' : 'bg.surface2',
        }),
      )}
      onClick={handleClick}
    >
      {tabName}
    </div>
  );
}

const tabNameCss = css({
  paddingBottom: '8px',
  textStyle: 'body3',
  borderBottomWidth: '1px',
  cursor: 'pointer',
});
