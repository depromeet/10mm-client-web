import { useState } from 'react';
import { type NormalButtonInputTypes } from '@/components/Input/Input.types';
import { css, cx } from '@/styled-system/css';
import { getBorderColor } from '@/utils/getBorderColor';

import Button from '../Button/Button';

export default function NormalButtonInput({
  value,
  onChange,
  onTextButtonClick,
  errorMsg,
  validMsg,
  required = false,
  buttonDisabeld,
  ...props
}: NormalButtonInputTypes) {
  const [isFocused, setIsFocused] = useState(false);

  const statusColor = errorMsg ? 'red.red500' : 'text.tertiary';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (props.maxLength && inputValue.length > props.maxLength) {
      return;
    }

    onChange?.(inputValue);
  };

  const isMaxLengthTextVisible = value && props.maxLength;

  return (
    <section className={sectionCss}>
      <label className={subTitleCss} htmlFor={props.id}>
        {props.name}
        {required && <span className={asterisk}>*</span>}
      </label>

      <div
        className={cx(
          inputWrapperCss,
          css({
            borderColor: getBorderColor(errorMsg, isFocused),
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
          {...(required && { required: true })}
          {...props}
        />
        <Button
          size="small"
          variant="secondary"
          type="button"
          className={buttonCss}
          onClick={onTextButtonClick}
          disabled={buttonDisabeld}
        >
          {props.buttonText}
        </Button>
      </div>

      <div className={descriptionCss}>
        <span
          className={css(descriptionTextCss, {
            color: statusColor,
          })}
        >
          {errorMsg || props.description}
        </span>

        {isMaxLengthTextVisible && (
          <span className={cx(inputLengthWrapperCss, css({ color: statusColor }))}>
            <strong>{value.length}</strong>/{props.maxLength}
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

const inputWrapperCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  borderBottomWidth: '1px',
  padding: '14px 4px',
  height: '50px',
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
});

const descriptionTextCss = {
  color: 'bg.surface1',
};

const buttonCss = css({
  marginLeft: '12px',
});

const sectionCss = css({
  width: '100%',
  _focusWithin: {},
});
