import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function ArrowDownIcon(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color={iconColor} {...restProps}>
      <path
        d="M2.79289 8.29289C3.18342 7.90237 3.81658 7.90237 4.20711 8.29289L12 16.0858L19.7929 8.29289C20.1834 7.90237 20.8166 7.90237 21.2071 8.29289C21.5976 8.68342 21.5976 9.31658 21.2071 9.70711L12.7071 18.2071C12.3166 18.5976 11.6834 18.5976 11.2929 18.2071L2.79289 9.70711C2.40237 9.31658 2.40237 8.68342 2.79289 8.29289Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ArrowDownIcon;
