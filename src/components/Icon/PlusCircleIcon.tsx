import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function PlusCircleIcon(props: IconComponentProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.875 8C12.875 7.51675 12.4832 7.125 12 7.125C11.5168 7.125 11.125 7.51675 11.125 8V11.125H8C7.51675 11.125 7.125 11.5168 7.125 12C7.125 12.4832 7.51675 12.875 8 12.875H11.125V16C11.125 16.4832 11.5168 16.875 12 16.875C12.4832 16.875 12.875 16.4832 12.875 16V12.875H16C16.4832 12.875 16.875 12.4832 16.875 12C16.875 11.5168 16.4832 11.125 16 11.125H12.875V8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default PlusCircleIcon;
