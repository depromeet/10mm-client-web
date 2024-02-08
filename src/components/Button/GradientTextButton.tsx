import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';
import { gradientBorderWrapperCss, gradientTextCss } from '@/constants/style/gradient';
import { css, cx } from '@styled-system/css';

function GradientTextButton({ children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={cx(
        css({
          display: 'block',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          cursor: 'pointer',
          height: '30px',
        }),
        gradientBorderWrapperCss(),
      )}
      type={'button'}
      {...props}
    >
      <span
        className={cx(
          css({
            textStyle: 'subtitle5',
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: '28px',
            padding: '0px 12px',
          }),
          gradientTextCss,
        )}
      >
        {children}
      </span>
    </button>
  );
}

export default GradientTextButton;
