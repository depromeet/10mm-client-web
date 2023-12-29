interface InputBaseType {}

export interface DropdownValueType {
  imgUrl?: string;
  label: string;
  value: string;
}

export interface DropDownInputType extends InputBaseType {
  selected: DropdownValueType | null;
  onSelect: (value: DropdownValueType) => void;
  list: DropdownValueType[];
  placeholder?: string;

  title: string;
  required?: boolean;
}
