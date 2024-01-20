import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@/styled-system/tokens';

function NormalCalender(props: IconComponentProps) {
  const { color, size = 20, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={iconColor}
      {...restProps}
    >
      <path
        d="M15.5556 11H10V16H15.5556V11ZM14.4444 0V2H5.55556V0H3.33333V2H2.22222C0.988889 2 0.0111111 2.9 0.0111111 4L0 18C0 19.1 0.988889 20 2.22222 20H17.7778C19 20 20 19.1 20 18V4C20 2.9 19 2 17.7778 2H16.6667V0H14.4444ZM17.7778 18H2.22222V7H17.7778V18Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default NormalCalender;
