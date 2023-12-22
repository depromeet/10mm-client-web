'use client';

import { type InputHTMLAttributes } from 'react';
import { useState } from 'react';
import { css } from '@/styled-system/css';

import Icon from '../Icon';
import { type IconComponentMap, type IconComponentProps } from '../Icon';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  iconName?: keyof typeof IconComponentMap; // iconName prop 수정
  iconColor?: IconComponentProps['color']; // 추가: iconColor prop
  value?: string;
  onChange?: (value: string) => void;
  onIconClick?: () => void;
}

export default function Input({ iconName, value, onChange, iconColor, onIconClick, ...inputProps }: InputProps) {
  const { required, name, maxLength } = inputProps;
  const [inputValue, setInputValue] = useState(value ? String(value) : '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _value = e.target.value;

    // input의 기본 속성인 maxLength만으로는 한글 대응이 불가능.
    if (inputProps.maxLength && _value.length >= inputProps.maxLength) {
      return;
    }

    setInputValue(_value);
    if (onChange) {
      onChange(_value);
    }
  };

  //Icon이 클릭되면 onIconClick props로 넘겨받은 함수 호출
  const onIconClickHandler = () => {
    setInputValue(''); // 클릭되면 input value를 빈 문자열로 초기화
    onChange && onChange('');

    if (onIconClick) {
      onIconClick();
    }
  };

  return (
    <section>
      <p className={subTitleCss}>
        {/* 인풋타이틀 */}
        {name}
        {required && <span className={asterisk}>*</span>}
      </p>

      <div className={inputWrapperCss}>
        <input
          className={inputCss}
          required
          autoComplete="off"
          value={inputValue}
          onChange={handleChange}
          {...inputProps}
        />
        {inputValue.length > 0 && iconName && (
          <Icon name={iconName} color={iconColor} className={iconCss} onClick={onIconClickHandler} />
        )}
      </div>

      <div className={descriptionCss}>
        {/* 처음엔 안보이다가 input의 길이가 너무 길면 빨간색으로 표시 */}
        <span className={descriptionTextCss}>디스크립션 영역입니다</span>

        {maxLength && (
          <span className={inputLengthCss}>
            {inputValue.length}/{maxLength}
          </span>
        )}
      </div>
    </section>
  );
}
const descriptionCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '12px',
});

const inputWrapperCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
  width: '100%',
  borderBottomWidth: '1px',
  paddingBottom: '10px',
  backgroundColor: 'bg.surface1',
  borderColor: 'border.default',
  _focusWithin: { outline: 'none', borderColor: 'purple.purple500' },
  boxSizing: 'border-box',
});

const subTitleCss = css({
  textStyle: 'body2',
  color: 'text.primary',
});
const asterisk = css({
  color: 'red.red500',
  fontWeight: 'bold',
});
const inputCss = css({
  width: '375px',
  textStyle: 'body2',
  color: 'text.secondary',
  backgroundColor: 'bg.surface1',
  _focus: { outline: 'none', borderColor: 'purple.purple500' },
});

const inputLengthCss = css({
  textStyle: 'body2',
  color: 'text.secondary',
});

const descriptionTextCss = css({
  color: 'bg.surface1',
});

const iconCss = css({
  cursor: 'pointer',
});
