import { css } from '@/styled-system/css';

import Icon from '../Icon';

interface Props {
  type: 'kakao' | 'apple';
  onClick?: () => void;
}

const ButtonSocialLogin = ({ type, onClick }: Props) => {
  if (type === 'kakao') {
    return (
      <button type={'button'} className={KakaoLoginButtonCss} onClick={onClick}>
        <Icon name="kakao-login" />
        Kakao로 계속하기
      </button>
    );
  }

  return (
    <button type={'button'} className={AppleLoginButtonCss} onClick={onClick}>
      <Icon name="apple-login" />
      Apple로 계속하기
    </button>
  );
};

export default ButtonSocialLogin;

const KakaoLoginButtonCss = css({
  width: '100%',
  maxWidth: '343px',
  height: '44px',
  padding: '0 24px',
  borderRadius: '16px',
  textStyle: 'subtitle4',
  backgroundColor: '#FEE500',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
});

const AppleLoginButtonCss = css({
  width: '100%',
  maxWidth: '343px',
  height: '44px',
  padding: '0 24px',
  borderRadius: '16px',
  textStyle: 'subtitle4',
  backgroundColor: 'basicColor.white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
});
