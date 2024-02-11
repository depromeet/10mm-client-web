export const isProd = () => process.env.NODE_ENV === 'production';

export const copyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    throw new Error('클립보드 복사에 실패했습니다.');
  }
};
