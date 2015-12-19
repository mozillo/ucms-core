/**
 * Created by tdzl2_000 on 2015-12-18.
 */

import { doAction } from './filter';
import Koa from 'koa';
import UCMSError from './UCMSError';

export async function startServer(options) {
  await doAction('init');
  const app = new Koa();

  // Translate error into json respnose.
  app.use((ctx, next) => {
    return next()
      .catch(err => {
        ctx.body = {
          message: err.message,
        };
        ctx.status = err.status;
      });
  });

  // Treat 404 as Invalid API error.
  app.use(() => {
    throw new UCMSError('Invalid API', 404);
  });

  app.listen(options.port, options.host);
  console.log('Ready.');
}
