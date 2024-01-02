import Icon from '@/components/Icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const KAKAO_LOGIN_EMAIL = 'carrotjoy123@kakao.com';

function LoginInfoPage() {
  return (
    <div className={containerCss}>
      <Icon name="log-in-information" color="icon.secondary" width={20} height={20} />
      <div className={textWrapperCss}>
        <p className={titleCss}>카카오 로그인</p>
        <p className={contentCss}>{KAKAO_LOGIN_EMAIL}</p>
      </div>
    </div>
  );
}

export default LoginInfoPage;

const containerCss = flex({
  gap: '10px',
  padding: '16px',
  alignItems: 'center',
  backgroundColor: 'bg.surface3',
  borderRadius: '22px',
  height: '74px',
  cursor: 'pointer',
});

const textWrapperCss = flex({ flex: 1, flexDirection: 'column', gap: '2px', minWidth: '0' });
const titleCss = css({
  color: 'text.tertiary',
  textStyle: 'body3',
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
const contentCss = css({
  color: 'text.secondary',
  textStyle: 'body2',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
