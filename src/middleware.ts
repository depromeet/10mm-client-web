import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies;
  const refreshToken = cookie.get('refreshToken') ? cookie.get('refreshToken')?.value : null;
  const accessToken = cookie.get('accessToken') ? cookie.get('accessToken')?.value : null;

  if (!refreshToken || !accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth|images|mockServiceWorker.js).*)',
};
