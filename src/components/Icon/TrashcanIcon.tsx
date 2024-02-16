import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function TrashcanIcon(props: IconComponentProps) {
  const { color, size = 36, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={iconColor}
      {...restProps}
    >
      <path
        d="M9.40627 3.3906C9.7772 2.8342 10.4017 2.5 11.0704 2.5H12.9296C13.5983 2.5 14.2228 2.8342 14.5937 3.3906L15.5 4.75H19.25C19.6642 4.75 20 5.08579 20 5.5C20 5.91421 19.6642 6.25 19.25 6.25H4.75C4.33579 6.25 4 5.91421 4 5.5C4 5.08579 4.33579 4.75 4.75 4.75H8.5L9.40627 3.3906Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 21H9C6.79086 21 5 19.2091 5 17V7.5H19V17C19 19.2091 17.2091 21 15 21ZM10 10.25C10.4142 10.25 10.75 10.5858 10.75 11V17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17L9.25 11C9.25 10.5858 9.58579 10.25 10 10.25ZM14 10.25C14.4142 10.25 14.75 10.5858 14.75 11V17C14.75 17.4142 14.4142 17.75 14 17.75C13.5858 17.75 13.25 17.4142 13.25 17V11C13.25 10.5858 13.5858 10.25 14 10.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default TrashcanIcon;
