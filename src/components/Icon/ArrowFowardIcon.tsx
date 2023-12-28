import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function ArrowFoWardIcon(props: IconComponentProps) {
  const { color, size = 24, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      color={iconColor}
      {...restProps}
    >
      <path
        d="M6.29289 3.04289C5.90237 3.43342 5.90237 4.06658 6.29289 4.45711L14.0858 12.25L6.29289 20.0429C5.90237 20.4334 5.90237 21.0666 6.29289 21.4571C6.68342 21.8476 7.31658 21.8476 7.70711 21.4571L16.2071 12.9571C16.5976 12.5666 16.5976 11.9334 16.2071 11.5429L7.70711 3.04289C7.31658 2.65237 6.68342 2.65237 6.29289 3.04289Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ArrowFoWardIcon;
