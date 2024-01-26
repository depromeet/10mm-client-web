import React, { type PropsWithChildren } from 'react';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  other: {
    'appleid-signin-scope': 'email',
    'appleid-signin-state': 'state',
    'appleid-signin-use-popup': 'true',
    'appleid-signin-client-id': process.env.NEXT_PUBLIC_APPLE_LOGIN_CLIENT_ID ?? '',
    'appleid-signin-nonce': process.env.NEXT_PUBLIC_SNS_LOGIN_NONCE ?? '',
    'appleid-signin-redirect-uri': process.env.NEXT_PUBLIC_APPLE_LOGIN_REDIRECT_URI ?? '',
  },
};

function LoginLayout({ children }: PropsWithChildren) {
  return <main>{children}</main>;
}

export default LoginLayout;
