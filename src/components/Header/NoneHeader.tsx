import { type NoneHeaderType } from './Header.types';
import HeaderBase from './HeaderBase';

function NoneHeader(props: NoneHeaderType) {
  return <HeaderBase rightElement={undefined} {...props} />;
}

export default NoneHeader;
