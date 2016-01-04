/**
 * Created by tdzl2_000 on 2015-12-18.
 */

import { doAction, applyFilter } from './filter';
import { SESSION } from './session';
import Koa from 'koa';
import UCMSError from './UCMSError';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const INIT = 'server.init';
const INIT_ROUTE = 'server.initRoute.';
const WILL_LISTEN = 'server.willListen';
const DID_LISTEN = 'server.didListen';

export const SERVER = {
  INIT,
  INIT_ROUTE,
  WILL_LISTEN,
  DID_LISTEN,
};

export async function startServer(port, host) {
  const app = new Koa();
  await doAction(INIT, app);

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

  app.use(bodyParser());

  // Parse session data.
  app.use(async (ctx, next) => {
    const token = await applyFilter(SESSION.LOAD_TOKEN, ctx);
    if (token) {
      const session = await applyFilter(SESSION.LOAD, token);
      ctx.session = session;
    }
    await next();
  });

  const router = new Router();
  await doAction(INIT_ROUTE + '/', router);
  app.use(router.routes());

  // Treat 404 as Invalid API error.
  app.use(() => Promise.reject(new UCMSError('Invalid API', 404)));

  // Start port listening
  await doAction(WILL_LISTEN, app);
  app.listen(port, host);
  await doAction(DID_LISTEN, app);
  console.log('Ready.');
}
