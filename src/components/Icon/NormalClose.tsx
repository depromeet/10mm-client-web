import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@/styled-system/tokens';

function NormalClose(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={iconColor}
      {...restProps}
    >
      <path
        d="M4.58909 3.41058C4.26366 3.08514 3.73602 3.08514 3.41058 3.41058C3.08514 3.73602 3.08514 4.26366 3.41058 4.58909L8.82149 10L3.41091 15.4106C3.08547 15.736 3.08547 16.2637 3.41091 16.5891C3.73635 16.9145 4.26398 16.9145 4.58942 16.5891L10 11.1785L15.4106 16.5891C15.736 16.9145 16.2637 16.9145 16.5891 16.5891C16.9145 16.2637 16.9145 15.736 16.5891 15.4106L11.1785 10L16.5894 4.58909C16.9149 4.26366 16.9149 3.73602 16.5894 3.41058C16.264 3.08514 15.7363 3.08514 15.4109 3.41058L10 8.82149L4.58909 3.41058Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default NormalClose;
