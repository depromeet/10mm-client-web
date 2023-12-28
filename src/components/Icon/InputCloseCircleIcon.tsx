import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function InputCloseCircleIcon(props: IconComponentProps) {
  const { color, size = 22, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 22 22"
      color={iconColor}
      {...restProps}
    >
      <path
        d="M19.071 4.92889C15.1678 1.02566 8.83212 1.02566 4.92889 4.92889C1.02566 8.83212 1.02566 15.1678 4.92889 19.071C8.83212 22.9743 15.1678 22.9743 19.071 19.071C22.9743 15.1678 22.9743 8.83212 19.071 4.92889ZM14.1213 15.5355L12 13.4142L9.87863 15.5355C9.48973 15.9244 8.85333 15.9244 8.46442 15.5355C8.07551 15.1466 8.07551 14.5102 8.46442 14.1213L10.5857 12L8.46442 9.87863C8.07551 9.48973 8.07551 8.85333 8.46442 8.46442C8.85333 8.07551 9.48973 8.07551 9.87863 8.46442L12 10.5857L14.1213 8.46442C14.5102 8.07551 15.1466 8.07551 15.5355 8.46442C15.9244 8.85333 15.9244 9.48973 15.5355 9.87863L13.4142 12L15.5355 14.1213C15.9244 14.5102 15.9244 15.1466 15.5355 15.5355C15.1466 15.9244 14.5102 15.9244 14.1213 15.5355Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default InputCloseCircleIcon;
