'use client';
import { type InputHTMLAttributes } from 'react';
import { useState } from 'react';
import { css } from '@/styled-system/css';

import Icon from '../Icon';
import { type IconComponentMap, type IconComponentProps } from '../Icon';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconName?: keyof typeof IconComponentMap; // iconName prop 수정
  iconColor?: IconComponentProps['color']; // 추가: iconColor prop
}

export default function Input({ iconName, iconColor, ...inputProps }: InputProps) {
  const { required, name, value, maxLength } = inputProps;
  const [inputValue, setInputValue] = useState(value ? String(value) : '');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
          {...inputProps}
          required
          autoComplete="off"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* input이 포커스 돼었을때만 icon 렌더링 */}
        {isInputFocused && iconName && <Icon name={iconName} color={iconColor} className={iconCss} />}
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

  // <section className={sectionCss}>
  //   <div>
  //     <p className={subTitleCss}>
  //       미션명 <span className={asterisk}>*</span>
  //     </p>
  //     <input className={inputCss} type="text" placeholder="미션명 입력" required />
  //     <CloseCircleIcon />
  //   </div>
  // </section>;
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
  backgroundColor: 'bg.surface2',
  borderColor: 'border.default',
  _focusWithin: { outline: 'none', borderColor: 'purple.purple500' },
  boxSizing: 'border-box',
});

const subTitleCss = css({
  marginTop: '36px',
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
  backgroundColor: 'bg.surface2',
  _focus: { outline: 'none', borderColor: 'purple.purple500' },
});

const inputLengthCss = css({
  textStyle: 'body2',
  color: 'text.secondary',
});
const descriptionTextCss = css({
  color: 'bg.surface2',
});

const iconCss = css({
  cursor: 'pointer',
});
