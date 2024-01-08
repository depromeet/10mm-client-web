import DropdownInput from '@/components/Input/DropdownInput';
import { type InputType } from '@/components/Input/Input.types';
import NormalInput from '@/components/Input/NormalInput';

import NormalButtonInput from './NormalButtonInput';

function Input<Value extends string = string>(props: InputType<Value>) {
  switch (props.variant) {
    case 'drop-down':
      return <DropdownInput {...props} />;
    case 'normal-button':
      return <NormalButtonInput {...props} />;
    case 'normal':
    default:
      return <NormalInput {...props} />;
  }
}

export default Input;
