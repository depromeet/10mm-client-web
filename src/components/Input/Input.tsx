import DropdownInput from '@/components/Input/DropdownInput';
import { type InputType } from '@/components/Input/Input.types';
import NormalInput from '@/components/Input/NormalInput';

function Input(props: InputType) {
  switch (props.variant) {
    case 'drop-down':
      return <DropdownInput {...props} />;
    case 'normal':
    default:
      return <NormalInput {...props} />;
  }
}

export default Input;
