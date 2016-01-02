/**
 * Created by tdzl2_000 on 2015-12-18.
 */

import { doAction } from './filter';
import Koa from 'koa';
import UCMSError from './UCMSError';
import Router from 'koa-router';

export const INIT = 'ucms-core/init';
export const INIT_ROUTE = 'ucms-core/initRoute:';
export const WILL_LISTEN = 'ucms-core/willListen';
export const DID_LISTEN = 'ucms-core/didListen';

export async function startServer(port, host) {
  await doAction(INIT);
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

  const router = new Router();
  await doAction(INIT_ROUTE + '/', router);
  app.use(router.routes());

  // Treat 404 as Invalid API error.
  app.use(() => Promise.reject(new UCMSError('Invalid API', 404)));

  await doAction(WILL_LISTEN);
  app.listen(port, host);
  await doAction(DID_LISTEN);
  console.log('Ready.');
}
