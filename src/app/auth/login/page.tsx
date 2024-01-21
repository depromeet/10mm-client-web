'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Button from '@/components/Button/Button';
import ButtonSocialLogin from '@/components/ButtonSocialLogin/ButtonSocialLogin';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

function kakaoInit() {
  // 페이지가 로드되면 실행
  window.Kakao.init('1e1defc726eab3bbd6c8d999cb541bf7');
}

function AppleInit() {
  window.AppleID.auth.init({
    clientId: '10mm.today.app',
    scope: 'email',
    redirectURI: 'https://ad91-121-167-139-58.ngrok-free.app/auth/appleCallback',
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

  const onClickLoginButton = () => {
    router.push(ROUTER.AUTH.SIGNIN);
  };

  useEffect(() => {
    // Listen for authorization success.
    document.addEventListener('AppleIDSignInOnSuccess', (event) => {
      // Handle successful response.
      console.log('success', event);
    });

    // Listen for authorization failures.
    document.addEventListener('AppleIDSignInOnFailure', (event) => {
      // Handle error.
      console.log('fail', event);
    });
  }, []);

  return (
    <main className={MainWrapperCss}>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
        integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
        crossOrigin="anonymous"
        onLoad={kakaoInit}
      />
      <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        type="text/javascript"
        onLoad={AppleInit}
      />

      <div className={LoginButtonListWrapperCss}>
        <Button variant="primary" size="large" onClick={onClickLoginButton}>
          아이디로 로그인
        </Button>
        <ButtonSocialLogin
          type="kakao"
          onClick={() => {
            window.Kakao.Auth.authorize({
              redirectUri: 'http://localhost:3000/auth/kakaoCallback',
            });
          }}
        />
        <ButtonSocialLogin
          type="apple"
          onClick={() => {
            const data = window.AppleID.auth.signIn();
            console.log(data);
          }}
        />
        <Button size="large" variant="ghost" onClick={onClickGuest}>
          둘러보기
        </Button>
      </div>
    </main>
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
