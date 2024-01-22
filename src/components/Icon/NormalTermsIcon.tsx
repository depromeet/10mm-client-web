import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function NormalTerms(props: IconComponentProps) {
  const { color, size = 24, ...restProps } = props;

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
        d="M3 3C2.44772 3 2 3.44772 2 4C2 4.55228 2.44772 5 3 5H15C15.5523 5 16 4.55228 16 4C16 3.44772 15.5523 3 15 3H3Z"
        fill="#D8D8DD"
      />
      <path
        d="M3 8C2.44772 8 2 8.44772 2 9C2 9.55228 2.44772 10 3 10H7C7.55228 10 8 9.55228 8 9C8 8.44772 7.55228 8 7 8H3Z"
        fill="#D8D8DD"
      />
      <path
        d="M3 13C2.44772 13 2 13.4477 2 14C2 14.5523 2.44772 15 3 15H6.99998C7.55226 15 8 14.5523 8 14C8 13.4477 7.55219 13 6.99991 13H3Z"
        fill="#D8D8DD"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 19C16.2958 19 17.4957 18.5892 18.4765 17.8907L20.2929 19.7071C20.6834 20.0976 21.3166 20.0976 21.7071 19.7071C22.0976 19.3166 22.0976 18.6834 21.7071 18.2929L19.8907 16.4765C20.5892 15.4957 21 14.2958 21 13C21 9.68629 18.3137 7 15 7C11.6863 7 9 9.68629 9 13C9 16.3137 11.6863 19 15 19ZM15 17C17.2091 17 19 15.2091 19 13C19 10.7909 17.2091 9 15 9C12.7909 9 11 10.7909 11 13C11 15.2091 12.7909 17 15 17Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default NormalTerms;
