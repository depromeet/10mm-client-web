import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';

function GradientPaperAirplaneIcon(props: IconComponentProps) {
  const { color, size = 24, ...restProps } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
      <path
        d="M14.3264 2.17356L7.47628 9.02368M2.89281 5.58172L13.5598 1.88093C14.2167 1.65303 14.8469 2.28327 14.619 2.94017L10.9182 13.6072C10.6647 14.3379 9.63855 14.3579 9.35669 13.6376L7.66285 9.30895C7.57825 9.09275 7.40721 8.92171 7.19102 8.83711L2.86232 7.14328C2.14202 6.86142 2.16205 5.83525 2.89281 5.58172Z"
        stroke="url(#paint0_linear_4807_139094)"
        strokeWidth="1.28472"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4807_139094"
          x1="2.33325"
          y1="1.83337"
          x2="14.8643"
          y2="2.03759"
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

export default GradientPaperAirplaneIcon;
