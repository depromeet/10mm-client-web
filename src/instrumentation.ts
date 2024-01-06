export async function register() {
  console.log('[instrumentation] server.listen()...', process.env.NEXT_RUNTIME, typeof window);

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('MOCKING ENABLED FOR:', process.pid);

    const { server } = await import('@/msw/node');
    server.listen();
  }
}
