import { type SVGProps } from 'react';

/**
 * TODO : Icon 컴포넌트로 변경
 */
export default function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_44_466)" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM17.4366 10.2365C17.7881 9.88502 17.7881 9.31517 17.4366 8.9637C17.0851 8.61223 16.5153 8.61223 16.1638 8.9637L10.8108 14.3167L7.83659 11.3425C7.48512 10.991 6.91527 10.991 6.5638 11.3425C6.21233 11.6939 6.21233 12.2638 6.5638 12.6153L10.1744 16.2259C10.5259 16.5773 11.0957 16.5773 11.4472 16.2259L17.4366 10.2365Z"
          fill="#929DFF"
        />
      </g>
      <defs>
        <clipPath id="clip0_44_466">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
