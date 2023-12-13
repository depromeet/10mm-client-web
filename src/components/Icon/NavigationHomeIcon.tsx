import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function NavigationHomeIcon(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color={iconColor} {...restProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 2.4695L3 7.4695C2.375 7.89172 2 8.54728 2 9.24728V19.2473C2 20.4695 3.125 21.4695 4.5 21.4695H8.66667V14.6918C8.66667 14.1395 9.11438 13.6918 9.66667 13.6918H14.3333C14.8856 13.6918 15.3333 14.1395 15.3333 14.6918V21.4695H19.5C20.875 21.4695 22 20.4695 22 19.2473V9.24728C22 8.54728 21.625 7.89172 21 7.4695L13.5 2.4695C12.6125 1.88061 11.3875 1.88061 10.5 2.4695Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default NavigationHomeIcon;
