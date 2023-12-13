import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function MenuIcon(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color={iconColor} {...restProps}>
      <path
        d="M6.82353 12.5C6.82353 13.3284 6.19146 14 5.41176 14C4.63207 14 4 13.3284 4 12.5C4 11.6716 4.63207 11 5.41176 11C6.19146 11 6.82353 11.6716 6.82353 12.5Z"
        fill="currenColor"
      />
      <path
        d="M13.4114 12.5C13.4114 13.3284 12.7794 14 11.9997 14C11.22 14 10.5879 13.3284 10.5879 12.5C10.5879 11.6716 11.22 11 11.9997 11C12.7794 11 13.4114 11.6716 13.4114 12.5Z"
        fill="currenColor"
      />
      <path
        d="M18.5885 14C19.3682 14 20.0003 13.3284 20.0003 12.5C20.0003 11.6716 19.3682 11 18.5885 11C17.8088 11 17.1768 11.6716 17.1768 12.5C17.1768 13.3284 17.8088 14 18.5885 14Z"
        fill="currenColor"
      />
    </svg>
  );
}

export default MenuIcon;
