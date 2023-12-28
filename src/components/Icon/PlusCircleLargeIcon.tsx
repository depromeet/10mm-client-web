import { type IconComponentProps } from '@/components/Icon/index';

function PlusCircleLarge(props: IconComponentProps) {
  const { color, size = 43, ...restProps } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.5 39.3108C31.1551 39.3108 38.9822 31.4837 38.9822 21.8286C38.9822 12.1735 31.1551 4.34644 21.5 4.34644C11.8449 4.34644 4.01784 12.1735 4.01784 21.8286C4.01784 31.4837 11.8449 39.3108 21.5 39.3108ZM23.0297 14.8357C23.0297 13.9909 22.3448 13.306 21.5 13.306C20.6552 13.306 19.9703 13.9909 19.9703 14.8357V20.2989H14.5071C13.6623 20.2989 12.9774 20.9838 12.9774 21.8286C12.9774 22.6734 13.6623 23.3583 14.5071 23.3583H19.9703V28.8215C19.9703 29.6663 20.6552 30.3512 21.5 30.3512C22.3448 30.3512 23.0297 29.6663 23.0297 28.8215V23.3583H28.4929C29.3377 23.3583 30.0226 22.6734 30.0226 21.8286C30.0226 20.9838 29.3377 20.2989 28.4929 20.2989H23.0297V14.8357Z"
        fill="#464856"
      />
    </svg>
  );
}

export default PlusCircleLarge;
