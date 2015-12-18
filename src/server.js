/**
 * Created by tdzl2_000 on 2015-12-18.
 */

import { doAction } from './filter';
import Koa from 'koa';


export async function startServer(options) {
  await doAction('init');
  const app = new Koa();

  app.listen(options.port, options.host);
  console.log('Ready.');
}
