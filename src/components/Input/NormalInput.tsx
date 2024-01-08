'use client';

import { useState } from 'react';
import { type NormalInputType } from '@/components/Input/Input.types';
import { css } from '@/styled-system/css';

import Icon from '../Icon';

export default function NormalInput({ value, onChange, errorMsg, ...props }: NormalInputType) {
  const [isFocused, setIsFocused] = useState(false);

  const statusColor = errorMsg ? 'red.red500' : 'text.tertiary';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // input의 기본 속성인 maxLength만으로는 한글 대응이 불가능.
    if (props.maxLength && inputValue.length > props.maxLength) {
      return;
    }

    onChange?.(inputValue);
  };

  const onDelete = () => {
    onChange?.('');
  };

  return (
    <section className={sectionCss}>
      <p className={subTitleCss}>
        {props.name}
        {props.required && <span className={asterisk}>*</span>}
      </p>

      <div
        className={css(inputWrapperCss, {
          borderColor: errorMsg ? 'red.red500' : isFocused ? 'purple.purple500' : 'border.default',
        })}
      >
        <input
          className={inputCss}
          required
          autoComplete="off"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {value.length > 0 && (
          <Icon name={'close-circle'} color={'icon.tertiary'} className={iconCss} onClick={onDelete} />
        )}
      </div>

      <div className={descriptionCss}>
        {/* 처음엔 안보이다가 input의 길이가 너무 길면 빨간색으로 표시 */}
        <span
          className={css(descriptionTextCss, {
            color: statusColor,
          })}
        >
          {errorMsg || props.description}
        </span>

        {props.maxLength && (
          <span className={css(inputLengthWrapperCss, { color: statusColor })}>
            <strong
              className={css({
                color: errorMsg ? 'red.red500' : 'text.tertiary',
              })}
            >
              {value.length}
            </strong>
            /{props.maxLength}
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
  textStyle: 'body6',
});

const inputWrapperCss = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  borderBottomWidth: '1px',
  padding: '14px 4px',
  height: '50px',
  _focusWithin: { outline: 'none' },
  boxSizing: 'border-box',
  backgroundColor: 'bg.surface2',
};

const subTitleCss = css({
  textStyle: 'body5',
  color: 'text.primary',
});

const asterisk = css({
  color: 'red.red500',
  fontWeight: 'bold',
  marginLeft: '2px',
});

const inputCss = css({
  flex: 1,
  height: '22px',
  textStyle: 'subtitle3',
  color: 'text.secondary',
  backgroundColor: 'bg.surface2',
  _focus: { outline: 'none' },
  _placeholder: { color: 'gray.gray300' },
});

const inputLengthWrapperCss = {
  textStyle: 'body6',
  color: 'text.tertiary',
};

const descriptionTextCss = {
  color: 'bg.surface1',
};

const iconCss = css({
  cursor: 'pointer',
  marginLeft: '12px',
});

const sectionCss = css({
  _focusWithin: {},
});
