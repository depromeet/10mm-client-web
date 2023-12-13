import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function NavigationUsersearchIcon(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color={iconColor} {...restProps}>
      <path
        d="M11 12C13.2091 12 15 10.2091 15 8C15 5.79086 13.2091 4 11 4C8.79086 4 7 5.79086 7 8C7 10.2091 8.79086 12 11 12Z"
        fill="currentColor"
      />
      <path
        d="M11.35 14.01C8.62 13.91 3 15.27 3 18V18.5C3 19.05 3.69946 20 4.24946 20H12.54C10.07 17.24 11.31 14.11 11.35 14.01Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.9101 15.2C21.1301 16.25 20.9001 17.22 20.4301 18.02L22.2801 19.89C22.6701 20.28 22.6701 20.91 22.2801 21.3C21.8901 21.69 21.2601 21.69 20.8701 21.3L19.0101 19.44C18.2101 19.91 17.2401 20.14 16.1901 19.92C14.5501 19.58 13.2501 18.2 13.0301 16.54C12.6801 13.91 14.9001 11.7 17.5301 12.04C19.1901 12.25 20.5701 13.56 20.9101 15.2ZM15.0001 16C15.0001 17.1 15.9001 18 17.0001 18C18.1001 18 19.0001 17.1 19.0001 16C19.0001 14.9 18.1001 14 17.0001 14C15.9001 14 15.0001 14.9 15.0001 16Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default NavigationUsersearchIcon;
