import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function AlarmIcon(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color={iconColor} {...restProps}>
      <path
        d="M19.2896 17.29L17.9996 16V11C17.9996 7.93 16.3596 5.36 13.4996 4.68V4C13.4996 3.17 12.8296 2.5 11.9996 2.5C11.1696 2.5 10.4996 3.17 10.4996 4V4.68C7.62956 5.36 5.99956 7.92 5.99956 11V16L4.70956 17.29C4.07956 17.92 4.51956 19 5.40956 19H18.5796C19.4796 19 19.9196 17.92 19.2896 17.29ZM15.9996 17H7.99956V11C7.99956 8.52 9.50956 6.5 11.9996 6.5C14.4896 6.5 15.9996 8.52 15.9996 11V17ZM11.9996 22C13.0996 22 13.9996 21.1 13.9996 20H9.99956C9.99956 21.1 10.8896 22 11.9996 22Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default AlarmIcon;
