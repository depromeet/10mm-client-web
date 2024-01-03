import { type ChangeEvent, useState } from 'react';

export const useInput = <T extends HTMLTextAreaElement | HTMLInputElement>(initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onInputChange = (e: ChangeEvent<T>) => {
    setValue(e.target.value);
  };
  return { value, onInputChange };
};
