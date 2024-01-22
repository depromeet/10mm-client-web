'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Button from '@/components/Button/Button';
import ButtonSocialLogin from '@/components/ButtonSocialLogin/ButtonSocialLogin';
import { ROUTER } from '@/constants/router';
import { isIOS } from '@/utils/window';
import { css } from '@styled-system/css';

function kakaoInit() {
  const KAKAO_JAVASCRIPT_SDK_KEY = process.env.KAKAO_JAVASCRIPT_SDK_KEY ?? '';
  window.Kakao.init('1e1defc726eab3bbd6c8d999cb541bf7');
}

function appleInit() {
  window.AppleID.auth.init({
    clientId: '10mm.today.app',
    scope: 'email',
    redirectURI: process.env.APPLE_LOGIN_REDIRECT_URI ?? '',
    state: 'state',
    nonce: 'nonce',
    usePopup: true,
  });
}

export default function LoginPage() {
  const router = useRouter();
  const onClickGuest = () => {
    router.push(ROUTER.GUEST.MISSION.NEW);
  };

  const onClickAppleLogin = () => {
    window.AppleID.auth.signIn();
  };

  const onClickKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'https://db4c-220-72-197-144.ngrok-free.app/auth/kakaoCallback',
    });
  };

  useEffect(() => {
    const appleIdSignInOnSuccessHandler = (event: Event) => {
      console.log('success', event);
    };
    document.addEventListener('AppleIDSignInOnSuccess', appleIdSignInOnSuccessHandler);

    const appleIdSignInOnFailureHandler = (event: Event) => {
      console.log('fail', event);
    };
    document.addEventListener('AppleIDSignInOnFailure', appleIdSignInOnFailureHandler);

    return () => {
      document.removeEventListener('AppleIDSignInOnSuccess', appleIdSignInOnSuccessHandler);
      document.removeEventListener('AppleIDSignInOnFailure', appleIdSignInOnFailureHandler);
    };
  }, []);

  return (
    <>
      <head>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
          onLoad={kakaoInit}
        />
        <Script
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
          type="text/javascript"
          onLoad={appleInit}
        />
      </head>
      <div className={MainWrapperCss}>
        <div className={LoginButtonListWrapperCss}>
          {isIOS() && <ButtonSocialLogin type="apple" onClick={onClickAppleLogin} />}
          <ButtonSocialLogin type="kakao" onClick={onClickKakaoLogin} />
          <Button size="large" variant="ghost" onClick={onClickGuest}>
            둘러보기
          </Button>
        </div>
      </div>
    </>
  );
}

const MainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',

  bgImage: 'url(/images/login_bg.png)',
  bgPosition: 'center',
  bgRepeat: 'no-repeat',
  bgSize: 'cover',

  width: '100%',
  height: '100vh',
  paddingBottom: '16px',
});

const LoginButtonListWrapperCss = css({
  maxWidth: '320px',
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
});
