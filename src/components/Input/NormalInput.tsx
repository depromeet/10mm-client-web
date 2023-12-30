'use client';
import { useState } from 'react';
import { type NormalInputType } from '@/components/Input/Input.types';
import { css } from '@/styled-system/css';

import Icon from '../Icon';

export default function NormalInput({ value, onChange, ...props }: NormalInputType) {
  const [inputValue, setInputValue] = useState(value ? String(value) : '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _value = e.target.value;

    // input의 기본 속성인 maxLength만으로는 한글 대응이 불가능.
    if (props.maxLength && _value.length > props.maxLength) {
      return;
    }

    setInputValue(_value);
    if (onChange) {
      onChange(_value);
    }
  };

  const onDelete = () => {
    setInputValue(''); // 클릭되면 input value를 빈 문자열로 초기화
    onChange && onChange('');
  };

  return (
    <section>
      <p className={subTitleCss}>
        {/* 인풋타이틀 */}
        {props.name}
        {props.required && <span className={asterisk}> *</span>}
      </p>

      <div className={inputWrapperCss}>
        <input className={inputCss} required autoComplete="off" value={inputValue} onChange={handleChange} {...props} />
        {inputValue.length > 0 && (
          <Icon name={'close-circle'} color={'icon.tertiary'} className={iconCss} onClick={onDelete} />
        )}
      </div>

      <div className={descriptionCss}>
        {/* 처음엔 안보이다가 input의 길이가 너무 길면 빨간색으로 표시 */}
        {props.description && <span className={descriptionTextCss}>{props.description}</span>}

        {props.maxLength && (
          <span className={inputLengthCss}>
            {inputValue.length}/{props.maxLength}
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
  width: '100%',
  borderBottomWidth: '1px',
  padding: '14px 4px',
  backgroundColor: 'bg.surface1',
  borderColor: 'border.default',
  _focusWithin: { outline: 'none', borderColor: 'purple.purple500' },
  boxSizing: 'border-box',
});

const subTitleCss = css({
  textStyle: 'body4',
  color: 'text.primary',
});
const asterisk = css({
  color: 'red.red500',
  fontWeight: 'bold',
});
const inputCss = css({
  width: '375px',
  height: '22px',
  textStyle: 'subtitle3',
  color: 'text.secondary',
  backgroundColor: 'bg.surface1',
  _focus: { outline: 'none', borderColor: 'purple.purple500' },
  _placeholder: { color: 'gray.gray300' },
});

const inputLengthCss = css({
  textStyle: 'body3',
  color: 'text.secondary',
});

const descriptionTextCss = css({
  color: 'bg.surface1',
});

const iconCss = css({
  cursor: 'pointer',
});
