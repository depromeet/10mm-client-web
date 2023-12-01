import { type SVGProps } from 'react';
import LeftArrowIcon from '@/components/Icon/LeftArrowIcon';

type IconType = 'left-arrow';

interface Props extends SVGProps<SVGSVGElement> {
  name: IconType;
}

export default function Icon({ name, ...props }: Props) {
  switch (name) {
    case 'left-arrow':
      return <LeftArrowIcon {...props} />;
  }
}
