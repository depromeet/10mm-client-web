'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AppleCallbackPage() {
  const params = useSearchParams();

  useEffect(() => {
    // debugger;
    const code = params.get('code');
    console.log('code', code);
  }, []);

  return <>hihi</>;
}
