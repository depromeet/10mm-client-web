import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function AlarmIcon(props: IconComponentProps) {
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
        d="M12 2C11.1716 2 10.5 2.67157 10.5 3.5V4.19252C7.9617 4.82226 5.991 7.01644 5.68005 9.78977L5.34005 11.8298C5.25005 12.5898 4.95005 13.2998 4.46005 13.8698C3.43005 15.0898 4.27005 16.9898 5.83005 16.9898H18.1701C19.7401 16.9898 20.5801 15.0898 19.5401 13.8698V13.8798C19.0501 13.3098 18.75 12.5898 18.66 11.8398L18.32 9.79977C18.0091 7.0264 16.0384 4.82514 13.5 4.19318V3.5C13.5 2.67157 12.8284 2 12 2Z"
        fill="currentColor"
      />
      <path
        d="M14.97 19.65C14.51 20.78 13.35 21.58 12 21.58C10.65 21.58 9.49 20.78 9.03 19.65C9.01 19.6 9 19.55 9 19.5C9 19.27 9.19 19.08 9.42 19.08H14.57C14.8 19.08 14.99 19.27 14.99 19.5C14.99 19.55 14.99 19.6 14.96 19.65H14.97Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default AlarmIcon;
