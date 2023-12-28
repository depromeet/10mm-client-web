import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function CloseIcon(props: IconComponentProps) {
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
        d="M5.50691 4.0927C5.11639 3.70217 4.48322 3.70217 4.0927 4.0927C3.70217 4.48322 3.70217 5.11639 4.0927 5.50691L10.5858 12L4.09309 18.4927C3.70257 18.8832 3.70257 19.5164 4.09309 19.9069C4.48361 20.2974 5.11678 20.2974 5.5073 19.9069L12 13.4142L18.4927 19.9069C18.8832 20.2974 19.5164 20.2974 19.9069 19.9069C20.2974 19.5164 20.2974 18.8832 19.9069 18.4927L13.4142 12L19.9073 5.50691C20.2978 5.11639 20.2978 4.48322 19.9073 4.0927C19.5168 3.70217 18.8836 3.70217 18.4931 4.0927L12 10.5858L5.50691 4.0927Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default CloseIcon;
