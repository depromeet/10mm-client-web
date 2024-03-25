import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSocialLogin } from '@/apis/auth';
import Loading from '@/components/Loading';
import { AUTH_PROVIDER } from '@/constants/common';
import { ROUTER } from '@/constants/router';
import { eventLogger } from '@/utils';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const { code, state } = router.query;

  const { mutateAsync } = useSocialLogin();

  useEffect(() => {
    (async () => {
      if (!code || !state) return;
      await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=authorization_code&client_id=ada9b0c9e6fe56fcea00ebe8eccc2e20&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}&code=${code}&client_secret=29kEX8301Z514wfSmUFNENNKKjxCVGvB`,
      }).then((res) => {
        res.json().then((data) => {
          mutateAsync(
            {
              provider: AUTH_PROVIDER.KAKAO,
              idToken: data.id_token,
            },
            {
              onSuccess: (successData) => {
                if (successData?.memberId) {
                  eventLogger.identify(successData.memberId.toString());
                }

                router.push(`${state}` ?? ROUTER.HOME);
              },
            },
          );
        });
      });
    })();
  }, [code, state]);

  return (
    <main>
      <Loading />
    </main>
  );
}
