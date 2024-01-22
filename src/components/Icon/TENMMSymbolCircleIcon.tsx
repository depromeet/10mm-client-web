import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';

function TENMMSymbolCircleIcon(props: IconComponentProps) {
  const { color, size = 20, ...restProps } = props;

  // const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;
  //   color 값은 일단 고정으로 사용한다

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 21" {...restProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99935 18.8327C14.6017 18.8327 18.3327 15.1017 18.3327 10.4993C18.3327 5.89698 14.6017 2.16602 9.99935 2.16602C5.39698 2.16602 1.66602 5.89698 1.66602 10.4993C1.66602 15.1017 5.39698 18.8327 9.99935 18.8327ZM5.70705 13.3331C6.66211 14.1284 8.06402 13.2739 9.14649 12.296C9.23781 12.6843 9.4402 13.0258 9.75459 13.2732C10.6657 13.9901 12.1726 13.6442 13.1203 12.5007C14.0679 11.3571 15.6218 8.64472 14.4264 7.64931C13.4714 6.85403 12.0694 7.70855 10.987 8.68644C10.8956 8.29816 10.6933 7.9566 10.3789 7.70924C9.46772 6.99237 7.96084 7.33823 7.01318 8.48176C6.06551 9.62529 4.51165 12.3377 5.70705 13.3331Z"
        fill="url(#paint0_linear_3495_57528)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3495_57528"
          x1="1.66602"
          y1="2.16602"
          x2="18.5998"
          y2="2.44198"
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

export default TENMMSymbolCircleIcon;
