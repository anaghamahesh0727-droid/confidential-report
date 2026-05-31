import { createRequestHandler } from '@tanstack/start-server-core';
import { getRouterManifest } from '../../dist/server/assets/_tanstack-start-manifest_v.js';

const handler = createRequestHandler({
  getRouterManifest,
});

export { handler };
