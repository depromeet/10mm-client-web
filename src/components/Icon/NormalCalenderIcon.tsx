import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@/styled-system/tokens';

function NormalCalender(props: IconComponentProps) {
  const { color, size = 20, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={iconColor}
      {...restProps}
    >
      <path
        d="M12.2044 8.66659H8.50065V11.9999H12.2044V8.66659ZM11.4636 1.33325V2.66659H5.53769V1.33325H4.05621V2.66659H3.31547C2.49324 2.66659 1.84139 3.26659 1.84139 3.99992L1.83398 13.3333C1.83398 14.0666 2.49324 14.6666 3.31547 14.6666H13.6858C14.5007 14.6666 15.1673 14.0666 15.1673 13.3333V3.99992C15.1673 3.26659 14.5007 2.66659 13.6858 2.66659H12.9451V1.33325H11.4636ZM13.6858 13.3333H3.31547V5.99992H13.6858V13.3333Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default NormalCalender;
