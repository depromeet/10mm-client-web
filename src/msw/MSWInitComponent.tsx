'use client';

const mswInit = () => {
  if (process.env.NEXT_PUBLIC_MSW_EBABLE === 'true') {
    if (typeof window === 'undefined') {
      (async () => {
        const { server } = await import('./node');
        server.listen();
      })();
    } else {
      (async () => {
        const { worker } = await import('./browser');
        worker.start();
      })();
    }
  }
};

export const MSWInitComponent = () => {
  mswInit();

  return null;
};
