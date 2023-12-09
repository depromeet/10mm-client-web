import localFont from 'next/font/local';

export const pretendardFont = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  preload: true,
  variable: '--pretendard',
  fallback: [
    'Pretendard Variable',
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
});
