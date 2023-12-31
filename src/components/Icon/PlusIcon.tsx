import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function PlusIcon(props: IconComponentProps) {
  const { color, size = 24, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      color={iconColor}
      {...restProps}
    >
      <path
        d="M18.8571 13.1429H13.1429V18.8571C13.1429 19.4857 12.6286 20 12 20C11.3714 20 10.8571 19.4857 10.8571 18.8571V13.1429H5.14286C4.51429 13.1429 4 12.6286 4 12C4 11.3714 4.51429 10.8571 5.14286 10.8571H10.8571V5.14286C10.8571 4.51429 11.3714 4 12 4C12.6286 4 13.1429 4.51429 13.1429 5.14286V10.8571H18.8571C19.4857 10.8571 20 11.3714 20 12C20 12.6286 19.4857 13.1429 18.8571 13.1429Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default PlusIcon;
