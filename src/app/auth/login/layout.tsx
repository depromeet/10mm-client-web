import React, { type PropsWithChildren } from 'react';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  other: {
    'appleid-signin-client-id': '10mm.today.app',
    'appleid-signin-scope': 'email',
    'appleid-signin-redirect-uri': 'https://ad91-121-167-139-58.ngrok-free.app/auth/appleCallback',
    'appleid-signin-state': 'state',
    'appleid-signin-nonce': 'nonce',
    'appleid-signin-use-popup': 'true',
  },
};

function LoginLayout({ children }: PropsWithChildren) {
  return <main>{children}</main>;
}

export default LoginLayout;
