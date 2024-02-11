import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function NavigationFeedIcon(props: IconComponentProps) {
  const { color, size = 24, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      color={iconColor}
      fill="none"
      {...restProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 3C5.68629 3 3 5.68629 3 9V15C3 18.3137 5.68629 21 9 21H15C18.3137 21 21 18.3137 21 15V9C21 5.68629 18.3137 3 15 3H9ZM9.5 10.2998C9.5 10.8521 9.05228 11.2998 8.5 11.2998C7.94772 11.2998 7.5 10.8521 7.5 10.2998C7.5 9.74752 7.94772 9.2998 8.5 9.2998C9.05228 9.2998 9.5 9.74752 9.5 10.2998ZM8.79551 14.2515C9.04218 13.974 9.46641 13.9479 9.7451 14.1924L9.87005 14.2864C9.96652 14.3535 10.1155 14.4474 10.3117 14.5425C10.704 14.7328 11.2784 14.9249 12 14.9249C12.7216 14.9249 13.296 14.7328 13.6883 14.5425C13.8845 14.4474 14.0335 14.3535 14.13 14.2864L14.2549 14.1925C14.5336 13.9479 14.9578 13.9739 15.2045 14.2515C15.4522 14.5301 15.4271 14.9567 15.1485 15.2044L15.073 15.2671C15.0317 15.3 14.9741 15.3438 14.9009 15.3946C14.7548 15.4963 14.5452 15.6274 14.2773 15.7573C13.7415 16.0171 12.9659 16.2749 12 16.2749C11.0341 16.2749 10.2585 16.0171 9.72271 15.7573C9.45483 15.6274 9.24521 15.4963 9.09911 15.3946L8.85156 15.2044C8.57293 14.9567 8.54784 14.5301 8.79551 14.2515ZM15.5 11.2998C16.0523 11.2998 16.5 10.8521 16.5 10.2998C16.5 9.74752 16.0523 9.2998 15.5 9.2998C14.9477 9.2998 14.5 9.74752 14.5 10.2998C14.5 10.8521 14.9477 11.2998 15.5 11.2998Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default NavigationFeedIcon;

export function GradientFeedIcon() {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="2.75"
        y="3.25"
        width="14.5"
        height="14.5"
        rx="4.75"
        stroke="url(#paint0_linear_4980_14754)"
        strokeWidth="0.5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.6263 12.4594C7.80902 12.2538 8.12326 12.2346 8.3297 12.4157L8.42225 12.4853C8.49372 12.535 8.60407 12.6045 8.74939 12.675C9.04 12.8159 9.4655 12.9582 10 12.9582C10.5345 12.9582 10.96 12.8159 11.2506 12.675C11.3959 12.6045 11.5063 12.535 11.5777 12.4853L11.6703 12.4157C11.8767 12.2346 12.191 12.2538 12.3737 12.4594C12.5572 12.6658 12.5386 12.9818 12.3322 13.1653L12.2763 13.2117C12.2457 13.2361 12.203 13.2685 12.1488 13.3062C12.0406 13.3815 11.8853 13.4786 11.6869 13.5748C11.29 13.7672 10.7155 13.9582 10 13.9582C9.28451 13.9582 8.71001 13.7672 8.31312 13.5748C8.11469 13.4786 7.95941 13.3815 7.85119 13.3062L7.66782 13.1653C7.46143 12.9818 7.44284 12.6658 7.6263 12.4594Z"
        fill="url(#paint1_linear_4980_14754)"
      />
      <circle cx="13" cy="9" r="1" fill="url(#paint2_linear_4980_14754)" />
      <circle cx="7.04102" cy="9" r="1" fill="url(#paint3_linear_4980_14754)" />
      <defs>
        <linearGradient
          id="paint0_linear_4980_14754"
          x1="2.5"
          y1="3"
          x2="17.7404"
          y2="3.24837"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAD0DE" />
          <stop offset="0.46875" stopColor="#CCCBFF" />
          <stop offset="1" stopColor="#ABD2FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4980_14754"
          x1="7.5"
          y1="12.2916"
          x2="12.5694"
          y2="12.5394"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAD0DE" />
          <stop offset="0.46875" stopColor="#CCCBFF" />
          <stop offset="1" stopColor="#ABD2FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4980_14754"
          x1="12"
          y1="8"
          x2="14.0321"
          y2="8.03312"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAD0DE" />
          <stop offset="0.46875" stopColor="#CCCBFF" />
          <stop offset="1" stopColor="#ABD2FF" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_4980_14754"
          x1="6.04102"
          y1="8"
          x2="8.07307"
          y2="8.03312"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAD0DE" />
          <stop offset="0.46875" stopColor="#CCCBFF" />
          <stop offset="1" stopColor="#ABD2FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
