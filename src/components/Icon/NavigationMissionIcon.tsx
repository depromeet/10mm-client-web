import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function NavigationMissionIcon(props: IconComponentProps) {
  const { color, size = 24, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      color={iconColor}
      fill="none"
      {...restProps}
    >
      <path
        d="M9.88828 16.0036C7.40426 18.1729 4.18722 20.0685 1.9956 18.3043C-0.74755 16.0961 2.81818 10.0791 4.99284 7.54236C7.1675 5.00564 10.6254 4.23839 12.7163 5.82866C13.4377 6.37738 13.9022 7.13507 14.1117 7.99641C16.5957 5.82713 19.8128 3.93151 22.0044 5.6957C24.7476 7.90387 21.1818 13.9209 19.0072 16.4576C16.8325 18.9944 13.3746 19.7616 11.2837 18.1713C10.5623 17.6226 10.0978 16.8649 9.88828 16.0036Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default NavigationMissionIcon;
