import { DEFAULT_ICON_COLOR, type IconComponentProps } from '@/components/Icon/index';
import { token } from '@styled-system/tokens';

function LightningIcon(props: IconComponentProps) {
  const { color, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color={iconColor} {...restProps}>
      <path
        d="M13.0993 2.50932C13.1728 1.82871 12.2956 1.49261 11.8955 2.04812L3.76066 13.3439C3.44308 13.7849 3.7582 14.4002 4.30164 14.4002H11.5907C11.9873 14.4002 12.2961 14.7442 12.2536 15.1385L11.5673 21.4911C11.4938 22.1717 12.3711 22.5078 12.7711 21.9523L20.906 10.6565C21.2235 10.2155 20.9084 9.60021 20.365 9.60021H13.0759C12.6793 9.60021 12.3705 9.25617 12.4131 8.86194L13.0993 2.50932Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default LightningIcon;
