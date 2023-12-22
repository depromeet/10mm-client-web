import { type ComponentProps } from 'react';
import Header from '@/components/Header/Header';

interface Props extends Omit<ComponentProps<typeof Header>, 'rightElement'> {}

function NoneHeader(props: Props) {
  return <Header {...props} />;
}

export default NoneHeader;
