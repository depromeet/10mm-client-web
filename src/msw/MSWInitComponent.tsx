'use client';

const mswInit = () => {
  // if (process.env.NODE_ENV === 'development') {
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
  // }
};

export const MSWInitComponent = () => {
  mswInit();

  return null;
};
