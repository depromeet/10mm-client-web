'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useSocialLogin, useUpdateMemberFcmToken } from '@/apis/auth';
// import Button from '@/components/Button/Button';
import ButtonSocialLogin from '@/components/ButtonSocialLogin/ButtonSocialLogin';
import { AUTH_PROVIDER, WINDOW_CUSTOM_EVENT } from '@/constants/common';
import { NATIVE_CUSTOM_EVENTS } from '@/constants/nativeCustomEvent';
import { ROUTER } from '@/constants/router';
import { eventLogger } from '@/utils';
import { isAndroid, isIOS, isWebView } from '@/utils/appEnv';
import { css } from '@styled-system/css';

const initKakao = () => {
  const KAKAO_JAVASCRIPT_SDK_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_SDK_KEY ?? '';
  window.Kakao.init(KAKAO_JAVASCRIPT_SDK_KEY);
};

const initAppleLogin = () => {
  window.AppleID.auth.init({
    scope: 'email',
    state: 'state',
    clientId: process.env.NEXT_PUBLIC_APPLE_LOGIN_CLIENT_ID ?? '',
    redirectURI: process.env.NEXT_PUBLIC_APPLE_LOGIN_REDIRECT_URI ?? '',
    nonce: process.env.NEXT_PUBLIC_SNS_LOGIN_NONCE ?? '',
    usePopup: true,
  });
};

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: socialLoginAsyncMutate } = useSocialLogin();
  const { mutate: updateMemberFcmTokenMutate } = useUpdateMemberFcmToken();
  const search = useSearchParams();
  const redirectUrl = search.get('redirect') ?? ROUTER.HOME;

  const onClickAppleLogin = () => {
    if (isWebView()) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: NATIVE_CUSTOM_EVENTS.APPLE_LOGIN,
        }),
      );
      return;
    }
    window.AppleID.auth.signIn();
  };

  const onClickKakaoLogin = () => {
    if (isWebView()) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: NATIVE_CUSTOM_EVENTS.KAKAO_LOGIN,
        }),
      );
      return;
    }

    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI,
      nonce: process.env.NEXT_PUBLIC_SNS_LOGIN_NONCE,
      throughTalk: isAndroid() ? false : true,
      state: redirectUrl,
    });
  };

  useEffect(() => {
    const webAppleIdSignInOnSuccessEventListener = (event: CustomEvent) => {
      socialLoginAsyncMutate(
        {
          provider: AUTH_PROVIDER.APPLE,
          idToken: event.detail.authorization.id_token,
        },
        {
          onSuccess: (data) => {
            if (data?.memberId) {
              eventLogger.identify(data.memberId.toString());
            }
            if (data.landingStatus === 'TO_ONBOARDING') {
              router.push(ROUTER.ONBOARDING.HOME);
              return;
            }
            router.push(redirectUrl);
          },
        },
      );
    };

    const nativeLoginCallbackEventListener = (event: CustomEvent) => {
      socialLoginAsyncMutate(
        {
          provider: event.detail.data.provider,
          idToken: event.detail.data.data,
        },
        {
          onSuccess: (data) => {
            if (data?.memberId) {
              eventLogger.identify(data.memberId.toString());
            }

            if (!!event.detail?.data?.deviceToken) {
              updateMemberFcmTokenMutate({ fcmToken: event.detail.data.deviceToken });
            }
            // 지금 당장은 필요없지만 나중을 위해 작동하도록 한다
            if (data.landingStatus === 'TO_ONBOARDING') {
              router.push(ROUTER.ONBOARDING.HOME);
              return;
            }
            router.push(redirectUrl);
          },
          onError: () => {
            window.Kakao.Auth.authorize({
              redirectUri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI,
              nonce: process.env.NEXT_PUBLIC_SNS_LOGIN_NONCE,
              throughTalk: false,
            });
          },
        },
      );
    };

    document.addEventListener(
      WINDOW_CUSTOM_EVENT.APPLE_ID_SIGN_IN_ON_SUCCESS,
      webAppleIdSignInOnSuccessEventListener as EventListener,
    );
    document.addEventListener(
      NATIVE_CUSTOM_EVENTS.APPLE_LOGIN_CALLBACK,
      nativeLoginCallbackEventListener as EventListener,
    );
    document.addEventListener(
      NATIVE_CUSTOM_EVENTS.KAKAO_LOGIN_CALLBACK,
      nativeLoginCallbackEventListener as EventListener,
    );

    return () => {
      document.removeEventListener(
        WINDOW_CUSTOM_EVENT.APPLE_ID_SIGN_IN_ON_SUCCESS,
        webAppleIdSignInOnSuccessEventListener as EventListener,
      );
      document.removeEventListener(
        NATIVE_CUSTOM_EVENTS.APPLE_LOGIN_CALLBACK,
        nativeLoginCallbackEventListener as EventListener,
      );
      document.removeEventListener(
        NATIVE_CUSTOM_EVENTS.KAKAO_LOGIN_CALLBACK,
        nativeLoginCallbackEventListener as EventListener,
      );
    };
  }, []);

  return (
    <>
      <head>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
          onLoad={initKakao}
        />
        <Script
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
          type="text/javascript"
          onLoad={initAppleLogin}
        />
      </head>
      <div className={MainWrapperCss}>
        <div className={LoginButtonListWrapperCss}>
          {isIOS() && <ButtonSocialLogin type="apple" onClick={onClickAppleLogin} />}
          <ButtonSocialLogin type="kakao" onClick={onClickKakaoLogin} />
          {/* <Button
            type="button"
            size="large"
            variant="ghost"
            onClick={onClickGuest}
            className={css({ color: 'text.primary' })}
          >
            둘러보기
          </Button> */}
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
