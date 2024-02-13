import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function TENMMSymbolCircleNormalIcon(props: IconComponentProps) {
  const { color, size = 20 } = props;
  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 15 14" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.49984 12.8337C10.7215 12.8337 13.3332 10.222 13.3332 7.00033C13.3332 3.77866 10.7215 1.16699 7.49984 1.16699C4.27818 1.16699 1.6665 3.77866 1.6665 7.00033C1.6665 10.222 4.27818 12.8337 7.49984 12.8337ZM4.49523 8.98396C5.16377 9.54066 6.1451 8.94249 6.90284 8.25797C6.96676 8.52977 7.10843 8.76886 7.3285 8.94201C7.96631 9.44382 9.02112 9.20171 9.68449 8.40125C10.3479 7.60078 11.4356 5.70209 10.5988 5.0053C9.93024 4.4486 8.9489 5.04677 8.19117 5.73129C8.12725 5.45949 7.98558 5.2204 7.7655 5.04725C7.12769 4.54544 6.07288 4.78755 5.40952 5.58801C4.74615 6.38848 3.65845 8.28717 4.49523 8.98396Z"
        fill={iconColor}
      />
    </svg>
  );
}

export default TENMMSymbolCircleNormalIcon;
