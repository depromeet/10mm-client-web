import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function NavigationSearchIcon(props: IconComponentProps) {
  const { color, size = 24, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size} {...restProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.42857 7C3.42857 5.02755 5.02755 3.42857 7 3.42857C8.97245 3.42857 10.5714 5.02755 10.5714 7C10.5714 8.97245 8.97245 10.5714 7 10.5714C5.02755 10.5714 3.42857 8.97245 3.42857 7ZM7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12C8.12425 12 9.16183 11.629 9.99697 11.0026L13.4527 14.4584C13.7304 14.7361 14.1807 14.7361 14.4584 14.4584C14.7361 14.1807 14.7361 13.7304 14.4584 13.4527L11.0026 9.99697C11.629 9.16183 12 8.12425 12 7C12 4.23858 9.76142 2 7 2Z"
        fill={iconColor}
      />
    </svg>
  );
}

export default NavigationSearchIcon;
