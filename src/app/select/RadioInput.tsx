import { type InputHTMLAttributes, type PropsWithChildren } from 'react';
import CheckCircleIcon from '@/app/select/CheckCircleIcon';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

const purple = '#8D96F0';
const lightPurple = '#EFF1FF';
const grey100 = '#F2F4F6';

/**
 * 디자인 시스템이 확정되지 않아서 component 페이지에 넣지 않고 select 폴더에 넣었습니다.
 */
export default function RadioInput({
  children,
  ...props
}: PropsWithChildren<Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>>) {
  return (
    <label className={labelCss}>
      <input className={InputWrapperCss} type="radio" {...props} />
      <div className={RadioInputWrapperCss}>
        <p
          className={flex({
            alignItems: 'center',
          })}
        >
          {children}
        </p>
        <CheckCircleIcon fill={purple} />
      </div>
    </label>
  );
}

const subtitle = {
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
};

const labelCss = css({
  cursor: 'pointer',
});

const RadioInputWrapperCss = flex({
  padding: '10px 16px',
  borderRadius: '36px',
  ...subtitle,
  background: grey100,

  justifyContent: 'space-between',

  alignItems: 'center',

  transition: '0.3s ease',

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
      color: purple,
      backgroundColor: lightPurple,
      '& svg': {
        display: 'block',
      },
    },
  },
});
