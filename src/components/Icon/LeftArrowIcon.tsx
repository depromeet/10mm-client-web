import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function LeftArrowIcon(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const currentColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
      <path d="M13.7139 17.4273L6.43555 10.149L13.7139 2.87012" stroke={currentColor} strokeWidth="1.66667" />
    </svg>
  );
}

export default LeftArrowIcon;
