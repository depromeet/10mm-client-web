import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';
import { gradientBorderWrapperCss, gradientTextCss } from '@/constants/style/gradient';
import { css, cx } from '@styled-system/css';

function GradientTextButton({
  children,
  blocked,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  blocked?: boolean;
}) {
  return (
    <button
      className={cx(
        buttonCss,
        gradientBorderWrapperCss(),
        css({
          pointerEvents: blocked ? 'none' : 'auto',
        }),
      )}
      type={'button'}
      {...props}
    >
      <span className={cx(textCss, gradientTextCss)}>{children}</span>
    </button>
  );
}

export default GradientTextButton;

const buttonCss = css({
  display: 'block',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '20px',
  cursor: 'pointer',
  height: '30px',
});

const textCss = css({
  textStyle: 'subtitle5',
  fontSize: '13px',
  fontWeight: 300,
  lineHeight: '28px',
  padding: '0px 12px',
});
