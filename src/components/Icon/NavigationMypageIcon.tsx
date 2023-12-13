import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function NavigationMypageIcon(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color={iconColor} {...restProps}>
      <path
        d="M17.0162 7.6512C17.0602 10.1616 14.8552 12.3578 12.2597 12.3871C9.61724 12.4165 7.46508 10.3465 7.44453 7.7569C7.42104 5.1702 9.53209 3.0386 12.1482 3.00043C14.726 2.9652 16.9721 5.10854 17.0162 7.6512Z"
        fill="currentColor"
      />
      <path
        d="M18.3666 22.0324H6.00566C4.70203 22.0324 3.68614 20.8638 3.90342 19.5778C4.17941 17.916 4.96041 16.4655 6.44901 15.3586C9.65816 12.9686 13.2754 13.0215 16.7371 14.5923C18.9773 15.6082 20.1518 17.3786 20.4806 19.6453C20.6626 20.9108 19.6438 22.0324 18.3666 22.0324Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default NavigationMypageIcon;
