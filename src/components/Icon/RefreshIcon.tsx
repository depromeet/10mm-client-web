import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function RefreshIcon(props: IconComponentProps) {
  const { color, size = 36, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={iconColor}
      {...restProps}
    >
      <path
        d="M18.0781 10.375C22.3325 10.375 25.7812 13.8238 25.7812 18.0781C25.7812 22.3325 22.3325 25.7812 18.0781 25.7812C13.8238 25.7812 10.375 22.3325 10.375 18.0781C10.375 17.7747 10.3926 17.4753 10.4267 17.1809C10.499 16.5572 10.0463 15.9531 9.41833 15.9531C8.87048 15.9531 8.38886 16.3336 8.32261 16.8774C8.27467 17.2709 8.25 17.6716 8.25 18.0781C8.25 23.506 12.6502 27.9062 18.0781 27.9062C23.506 27.9062 27.9062 23.506 27.9062 18.0781C27.9062 12.6502 23.506 8.25 18.0781 8.25C15.7692 8.25 13.6462 9.04623 11.9688 10.3791V9.84375C11.9688 9.25695 11.493 8.78125 10.9062 8.78125C10.3195 8.78125 9.84375 9.25695 9.84375 9.84375V12.7107C9.83182 12.729 9.81994 12.7473 9.80812 12.7656H9.84375V13.0312C9.84375 13.618 10.3195 14.0938 10.9062 14.0938H14.0938C14.6805 14.0938 15.1562 13.618 15.1562 13.0312C15.1562 12.4445 14.6805 11.9688 14.0938 11.9688H13.3856C14.6849 10.9693 16.3121 10.375 18.0781 10.375Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default RefreshIcon;
