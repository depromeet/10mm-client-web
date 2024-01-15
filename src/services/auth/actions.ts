'use server';

import { cookies } from 'next/headers';

interface StoreTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export async function storeToken(request: StoreTokenRequest) {
  cookies().set({
    name: 'accessToken',
    value: request.accessToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  cookies().set({
    name: 'refreshToken',
    value: request.refreshToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
}

export async function getTokens() {
  const accessToken = cookies().get('accessToken');
  const refreshToken = cookies().get('refreshToken');

  return {
    accessToken: accessToken ? accessToken.value : null,
    refreshToken: refreshToken ? refreshToken.value : null,
  };
}

export async function removeTokens() {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
}
