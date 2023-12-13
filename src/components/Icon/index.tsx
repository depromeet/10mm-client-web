import { type SVGProps } from 'react';
import LeftArrowIcon from '@/components/Icon/LeftArrowIcon';
import { type ColorToken } from '@styled-system/tokens';

const IconComponentMap = {
  'left-arrow': LeftArrowIcon,
} as const;

interface Props extends IconComponentProps {
  name: keyof typeof IconComponentMap;
  color?: ColorToken;
}

export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  color?: ColorToken;
}

export default function Icon({ name, ...props }: Props) {
  const IconComponent = IconComponentMap[name];

  return <IconComponent {...props} />;
}

export const DEFAULT_ICON_COLOR = '#D8D8DD';
