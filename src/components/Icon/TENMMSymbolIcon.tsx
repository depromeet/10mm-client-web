import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function TENMMSymbolIcon(props: IconComponentProps) {
  const { color, size = 16, ...restProps } = props;

  const iconColor =
    color === 'gradients.primary'
      ? 'url(#paint0_linear_5207_46790)'
      : color
        ? token.var(`colors.${color}`)
        : DEFAULT_ICON_COLOR;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={iconColor}
      {...restProps}
    >
      <path
        d="M6.90057 10.2759C5.531 11.5131 3.75728 12.5943 2.54893 11.5881C1.03648 10.3286 3.00246 6.89684 4.20146 5.45003C5.40046 4.00321 7.30699 3.56562 8.4598 4.47262C8.85757 4.78558 9.11364 5.21773 9.22918 5.70899C10.5987 4.47175 12.3725 3.39059 13.5808 4.39679C15.0933 5.65621 13.1273 9.08801 11.9283 10.5348C10.7293 11.9816 8.82276 12.4192 7.66994 11.5122C7.27217 11.1993 7.01611 10.7671 6.90057 10.2759Z"
        fill={iconColor}
      />
      <defs>
        <linearGradient
          id="paint0_linear_5207_46790"
          x1="2.25"
          y1="4.5"
          x2="16.1099"
          y2="4.84312"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7C1D8" />
          <stop offset="0.48" stopColor="#DDD5FA" />
          <stop offset="1" stopColor="#97CDF4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default TENMMSymbolIcon;
