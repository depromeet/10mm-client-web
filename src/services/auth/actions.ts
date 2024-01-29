'use client';

interface StoreTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export async function storeToken(request: StoreTokenRequest) {
  if (typeof window === 'undefined') {
    return {
      accessToken: null,
      refreshToken: null,
    };
  }
  localStorage.setItem('accessToken', request.accessToken);
  localStorage.setItem('refreshToken', request.refreshToken);
}

export async function getTokens() {
  if (typeof window === 'undefined') {
    return {
      accessToken: null,
      refreshToken: null,
    };
  }

  const accessToken = localStorage.getItem('accessToken') ?? process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const refreshToken = localStorage.getItem('refreshToken') ?? process.env.NEXT_PUBLIC_REFRESH_TOKEN;

  return {
    accessToken: accessToken ?? null,
    refreshToken: refreshToken ?? null,
  };
}

export async function removeTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
