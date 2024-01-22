'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function KakaoCallbackPage() {
  const params = useSearchParams();

  useEffect(() => {
    (async () => {
      const code = params.get('code');
      await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=authorization_code&client_id=ada9b0c9e6fe56fcea00ebe8eccc2e20&redirect_uri=https://db4c-220-72-197-144.ngrok-free.app/auth/kakaoCallback&code=${code}&client_secret=29kEX8301Z514wfSmUFNENNKKjxCVGvB`,
      }).then((res) => console.log(res.json()));
    })();
  }, []);

  return <>hihi</>;
}
