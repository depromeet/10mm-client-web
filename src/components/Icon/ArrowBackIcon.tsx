import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function ArrowBackIcon(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color={iconColor} {...restProps}>
      <path
        d="M17.7071 3.04289C18.0976 3.43342 18.0976 4.06658 17.7071 4.45711L9.91421 12.25L17.7071 20.0429C18.0976 20.4334 18.0976 21.0666 17.7071 21.4571C17.3166 21.8476 16.6834 21.8476 16.2929 21.4571L7.79289 12.9571C7.40237 12.5666 7.40237 11.9334 7.79289 11.5429L16.2929 3.04289C16.6834 2.65237 17.3166 2.65237 17.7071 3.04289Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ArrowBackIcon;
