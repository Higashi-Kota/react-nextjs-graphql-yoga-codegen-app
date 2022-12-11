// https://github.com/vercel/next.js/blob/canary/examples/with-msw/mocks/index.ts
async function initMocks() {
  if (typeof window === 'undefined') {
    // node
    const {server} = await import('./server');
    server.listen({
      onUnhandledRequest: 'warn',
    });
  } else {
    // window
    const {worker} = await import('./browser');
    // https://stackoverflow.com/a/68024936/15972569
    // https://mswjs.io/docs/api/setup-worker/start#onunhandledrequest
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}

initMocks();

export {};
