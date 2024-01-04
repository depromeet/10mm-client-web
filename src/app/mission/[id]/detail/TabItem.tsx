import { cva } from '@styled-system/css';

interface TabItemProps {
  status: 'active' | 'inactive';
  label: string;
  onTabClick?: (label: string) => void;
}

function TabItem({ status, label, onTabClick }: TabItemProps) {
  const handleClick = () => {
    onTabClick && onTabClick(label);
  };

  return (
    <div
      className={tabItemCss({
        status,
      })}
      onClick={handleClick}
    >
      {label}
    </div>
  );
}

export default TabItem;

const tabItemCss = cva({
  base: {
    paddingBottom: '8px',
    borderBottom: '1px solid',
    textStyle: 'body3',
  },
  variants: {
    status: {
      active: {
        color: 'purple.purple700',
        borderColor: 'purple.purple600',
      },

      inactive: {
        borderColor: 'transparent',
      },
    },
  },
  defaultVariants: {
    status: 'inactive',
  },
});
