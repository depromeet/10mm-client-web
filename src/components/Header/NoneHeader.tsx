import { type NoneHeaderType } from '@/components/Header/Header.types';
import HeaderBase from '@/components/Header/HeaderBase';

function NoneHeader(props: NoneHeaderType) {
  return <HeaderBase rightElement={undefined} {...props} />;
}

export default NoneHeader;
