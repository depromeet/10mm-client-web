'use client';

interface StoreTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export async function storeToken(request: StoreTokenRequest) {
  localStorage.setItem('accessToken', request.accessToken);
  localStorage.setItem('refreshToken', request.refreshToken);
}

export async function getTokens() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return {
    accessToken: accessToken ?? null,
    refreshToken: refreshToken ?? null,
  };
}

export async function removeTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
