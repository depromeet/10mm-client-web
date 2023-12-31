import { type InputHTMLAttributes } from 'react';

interface InputBaseType {
  variant?: 'normal' | 'drop-down';
}

export interface NormalInputType extends InputBaseType, Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  variant?: 'normal';
  value: string;
  onChange?: (value: string) => void;

  description?: string;
}

export interface DropdownValueType {
  imgUrl?: string;
  label: string;
  value: string;
}

export interface DropDownInputType extends InputBaseType {
  variant: 'drop-down';
  selected: DropdownValueType | null;
  onSelect: (value: DropdownValueType) => void;
  list: DropdownValueType[];
  placeholder?: string;
  title: string;
  required?: boolean;
}

export type InputType = DropDownInputType | NormalInputType;
