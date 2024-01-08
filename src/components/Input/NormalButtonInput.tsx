'use client';

import { useState } from 'react';
import { type NormalButtonInputTypes } from '@/components/Input/Input.types';
import { css } from '@/styled-system/css';

import Button from '../Button/Button';

export default function NormalButtonInput({
  value,
  onChange,
  errorMsg,
  positiveMsg,
  ...props
}: NormalButtonInputTypes) {
  const [isFocused, setIsFocused] = useState(false);

  const statusColor = errorMsg ? 'red.red500' : 'text.tertiary';
  //닉네임 사용 가능시 디스크립션에 보여줄 positiveColor
  // const positiveColor = positiveMsg ? 'blue.blue500' : 'text.tertiary';

  //중복확인 버튼이 사용 가능할지에 대한 상태. 네이밍 논의 필요.
  const [doubleCheckabled, setDoubleCheckAbled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // input의 기본 속성인 maxLength만으로는 한글 대응이 불가능.
    if (props.maxLength && inputValue.length > props.maxLength) {
      return;
    }

    onChange?.(inputValue);
    //
    setDoubleCheckAbled(inputValue.length === 0);
  };

  const onDoubleCheck = () => {
    //TODO: 중복확인 로직
    alert('중복확인 로직 추가');
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
        <Button
          size="small"
          variant="secondary"
          type="button"
          className={buttonCss}
          onClick={onDoubleCheck}
          disabled={doubleCheckabled}
        >
          중복확인
        </Button>
      </div>

      {/* 닉네임 사용 가능 시 positive 컬러로 보여주기 추가 예정 */}
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
  alignItems: 'center',
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

const buttonCss = css({
  marginLeft: '12px',
});

const sectionCss = css({
  _focusWithin: {},
});
