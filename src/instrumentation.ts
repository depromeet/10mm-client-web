import * as process from 'process';

export async function register() {
  console.info('[instrumentation] server.listen()...', process.env.NEXT_RUNTIME, typeof window);

  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NEXT_PUBLIC_MSW_EBABLE === 'true') {
    console.info('MOCKING ENABLED FOR:', process.pid);

    const { server } = await import('@/msw/node');
    server.listen();
  }
}
