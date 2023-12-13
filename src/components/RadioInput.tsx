import { type ChangeEvent, type InputHTMLAttributes, type PropsWithChildren } from 'react';
import Icon from '@/components/Icon';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

export interface RadioInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onChange?: (value: string) => void;
}

/**
 * 디자인 시스템이 확정시 고도화
 */
export default function RadioInput({ children, onChange, ...props }: PropsWithChildren<RadioInputProps>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
  };

  return (
    <label className={labelCss}>
      <input className={InputWrapperCss} type="radio" onChange={handleChange} {...props} />
      <div className={RadioInputWrapperCss}>
        <p
          className={flex({
            alignItems: 'center',
          })}
        >
          {children}
        </p>
        <Icon name={'check-circle'} color={'purple.purple700'} />
      </div>
    </label>
  );
}

const labelCss = css({
  cursor: 'pointer',
});

const RadioInputWrapperCss = flex({
  textStyle: 'subtitle3',
  padding: '10px 16px',

  borderRadius: '36px',
  background: 'bg.surface3',

  justifyContent: 'space-between',
  alignItems: 'center',

  transition: '0.3s ease',
  color: 'text.secondary',
  '& svg': {
    display: 'none',
  },
});

const InputWrapperCss = css({
  position: 'absolute',
  opacity: 0,
  height: 0,
  width: 0,
  _checked: {
    '& ~ div': {
      color: 'text.secondary',
      textStyle: 'subtitle2',
      border: '1px solid',
      borderColor: 'purple.purple700',
      '& svg': {
        display: 'block',
      },
    },
  },
});
