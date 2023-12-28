import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function ArrowDiagonalIcon(props: IconComponentProps) {
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
        d="M9.5925 6C9.5925 6.56 10.0425 7 10.5925 7H16.1825L5.2925 17.89C4.9025 18.28 4.9025 18.91 5.2925 19.3C5.6825 19.69 6.3125 19.69 6.7025 19.3L17.5925 8.41V14C17.5925 14.55 18.0425 15 18.5925 15C19.1425 15 19.5925 14.55 19.5925 14V6C19.5925 5.45 19.1425 5 18.5925 5H10.5925C10.0425 5 9.5925 5.45 9.5925 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ArrowDiagonalIcon;
