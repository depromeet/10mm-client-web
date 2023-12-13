import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function CopyLinkIcon(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color={iconColor} {...restProps}>
      <path
        d="M15.6316 2H5.78947C4.80526 2 4 2.81818 4 3.81818V15.6364C4 16.1364 4.40263 16.5455 4.89474 16.5455C5.38684 16.5455 5.78947 16.1364 5.78947 15.6364V4.72727C5.78947 4.22727 6.19211 3.81818 6.68421 3.81818H15.6316C16.1237 3.81818 16.5263 3.40909 16.5263 2.90909C16.5263 2.40909 16.1237 2 15.6316 2ZM16.1595 6.17273L20.4811 10.5636C20.8121 10.9 21 11.3636 21 11.8455V20.1818C21 21.1818 20.1947 22 19.2105 22H9.35947C8.37526 22 7.57895 21.1818 7.57895 20.1818L7.58789 7.45455C7.58789 6.45455 8.38421 5.63636 9.36842 5.63636H14.8889C15.3632 5.63636 15.8195 5.82727 16.1595 6.17273ZM15.6316 12H19.6579L14.7368 7V11.0909C14.7368 11.5909 15.1395 12 15.6316 12Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default CopyLinkIcon;
