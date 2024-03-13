import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function ClockIcon(props: IconComponentProps) {
  const { color, size = 24 } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 9.75C2.25 6.02208 5.27208 3 9 3C12.7279 3 15.75 6.02208 15.75 9.75C15.75 13.4779 12.7279 16.5 9 16.5C5.27208 16.5 2.25 13.4779 2.25 9.75ZM9.75 6.75C9.75 6.33579 9.41421 6 9 6C8.58579 6 8.25 6.33579 8.25 6.75V9.75C8.25 9.94891 8.32902 10.1397 8.46967 10.2803L9.96967 11.7803C10.2626 12.0732 10.7374 12.0732 11.0303 11.7803C11.3232 11.4874 11.3232 11.0126 11.0303 10.7197L9.75 9.43934V6.75Z"
        fill={iconColor}
      />
      <path
        d="M3.45004 3.97504C3.11867 4.22357 2.64857 4.15641 2.40004 3.82504C2.15152 3.49367 2.21867 3.02357 2.55004 2.77504L4.05004 1.65004C4.38141 1.40152 4.85152 1.46867 5.10004 1.80004C5.34857 2.13141 5.28141 2.60152 4.95004 2.85004L3.45004 3.97504Z"
        fill={iconColor}
      />
      <path
        d="M13.95 1.65013C13.6187 1.4016 13.1486 1.46876 12.9 1.80013C12.6515 2.1315 12.7187 2.6016 13.05 2.85013L14.55 3.97513C14.8814 4.22366 15.3515 4.1565 15.6 3.82513C15.8486 3.49376 15.7814 3.02366 15.45 2.77513L13.95 1.65013Z"
        fill={iconColor}
      />
    </svg>
  );
}

export default ClockIcon;
