import { type InputHTMLAttributes } from 'react';

interface InputBaseType {
  variant?: 'normal' | 'drop-down' | 'normal-button';
}

export interface NormalInputType extends InputBaseType, Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  variant?: 'normal';
  value: string;
  onChange?: (value: string) => void;

  description?: string;
  errorMsg?: string;
}

export interface DropdownValueType<Value = string> {
  imgUrl?: string;
  label: string;
  value: Value;
}

export interface NormalButtonInputTypes extends InputBaseType, Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  variant: 'normal-button';
  value: string;
  onChange?: (value: string) => void;

  description?: string;
  errorMsg?: string;
  validMsg?: string;
  required?: boolean;
  text: string;
}

export interface DropDownInputType<T extends string> extends InputBaseType {
  variant: 'drop-down';
  selected: DropdownValueType<T> | null;
  onSelect: (value: DropdownValueType<T>) => void;
  list: DropdownValueType<T>[];
  placeholder?: string;
  title: string;
  required?: boolean;
}

export type InputType<V extends string> = DropDownInputType<V> | NormalInputType | NormalButtonInputTypes;
