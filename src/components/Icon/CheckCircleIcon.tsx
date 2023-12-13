import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function CheckCircleIcon(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color={iconColor} {...restProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.2348 9.67828C17.6094 9.27246 17.5841 8.6398 17.1783 8.2652C16.7725 7.89059 16.1398 7.9159 15.7652 8.32172L10.5277 13.9957L8.25926 11.3492C7.89983 10.9299 7.26853 10.8813 6.84921 11.2407C6.42988 11.6002 6.38132 12.2315 6.74074 12.6508L9.74074 16.1508C9.92655 16.3676 10.1961 16.4946 10.4816 16.4998C10.7671 16.5051 11.0412 16.3881 11.2348 16.1783L17.2348 9.67828Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default CheckCircleIcon;
