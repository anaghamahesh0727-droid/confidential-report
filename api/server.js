import { createRequestHandler } from '@tanstack/start/server';

export default async function handler(req, res) {
  const requestHandler = createRequestHandler({
    build: () => import('../dist/server/server.js'),
  });

  return requestHandler(req, res);
}
