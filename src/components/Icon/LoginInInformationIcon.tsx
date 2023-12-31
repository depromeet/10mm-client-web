import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon';
import { token } from '@/styled-system/tokens';

function LoginInInformationIcon(props: IconComponentProps) {
  const { color, size = 22, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      color={iconColor}
      {...restProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0002 1.6665C7.69898 1.6665 5.8335 3.53198 5.8335 5.83317C5.8335 8.13436 7.69898 9.99984 10.0002 9.99984C12.3013 9.99984 14.1668 8.13436 14.1668 5.83317C14.1668 3.53198 12.3013 1.6665 10.0002 1.6665ZM7.50016 5.83317C7.50016 4.45246 8.61945 3.33317 10.0002 3.33317C11.3809 3.33317 12.5002 4.45246 12.5002 5.83317C12.5002 7.21388 11.3809 8.33317 10.0002 8.33317C8.61945 8.33317 7.50016 7.21388 7.50016 5.83317Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.50016 11.6665C5.19898 11.6665 3.3335 13.532 3.3335 15.8332C3.3335 17.2139 4.45278 18.3332 5.8335 18.3332H14.1668C15.5475 18.3332 16.6668 17.2139 16.6668 15.8332C16.6668 13.532 14.8013 11.6665 12.5002 11.6665H7.50016ZM5.00016 15.8332C5.00016 14.4525 6.11945 13.3332 7.50016 13.3332H12.5002C13.8809 13.3332 15.0002 14.4525 15.0002 15.8332C15.0002 16.2934 14.6271 16.6665 14.1668 16.6665H5.8335C5.37326 16.6665 5.00016 16.2934 5.00016 15.8332Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default LoginInInformationIcon;
