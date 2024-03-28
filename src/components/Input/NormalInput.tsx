'use client';

import { useState } from 'react';
import { type NormalInputType } from '@/components/Input/Input.types';
import { css, cx } from '@/styled-system/css';

import Icon from '../Icon';

export default function NormalInput({ value, onChange, errorMsg, ...props }: NormalInputType) {
  const [isFocused, setIsFocused] = useState(false);

  const statusColor = errorMsg ? 'red.red500' : 'text.tertiary';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (props.maxLength && inputValue.length > props.maxLength) {
      return;
    }

    onChange?.(inputValue);
  };

  const onDelete = () => {
    onChange?.('');
  };

  const isDeleteButtonVisible = value && value.length > 0;
  // const isMaxLengthTextVisible = value && props.maxLength;

  return (
    <section className={sectionCss}>
      <label className={subTitleCss} htmlFor={props.id}>
        {props.name}
        {props.required && <span className={asterisk}>*</span>}
      </label>

      <div
        className={cx(
          inputWrapperCss,
          css({
            borderColor: errorMsg ? 'red.red500' : isFocused ? 'purple.purple500' : 'border.default',
          }),
        )}
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
        {isDeleteButtonVisible && (
          <Icon name={'close-circle'} color={'icon.tertiary'} className={iconCss} onClick={onDelete} />
        )}
      </div>

      <div className={descriptionCss}>
        <span
          className={cx(
            descriptionTextCss,
            css({
              color: statusColor,
            }),
          )}
        >
          {errorMsg || props.description}
        </span>

        <span className={cx(inputLengthWrapperCss, css({ color: statusColor }))}>
          {props.maxLength && (
            <>
              <strong
                className={css({
                  color: errorMsg ? 'red.red500' : 'text.tertiary',
                })}
              >
                {value?.length ?? 0}
              </strong>
              /{props.maxLength}
            </>
          )}
        </span>
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

const inputWrapperCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  borderBottomWidth: '1px',
  padding: '12px 4px 14px',
  height: '48px',
  _focusWithin: { outline: 'none' },
  boxSizing: 'border-box',
  backgroundColor: 'bg.surface2',
});

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

const inputLengthWrapperCss = css({
  textStyle: 'body6',
  color: 'text.tertiary',
  minHeight: '17px',
});

const descriptionTextCss = css({
  color: 'bg.surface1',
});

const iconCss = css({
  cursor: 'pointer',
  marginLeft: '12px',
});

const sectionCss = css({
  width: '100%',
  _focusWithin: {},
});
