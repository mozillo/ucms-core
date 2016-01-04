/**
 * Created by Yun on 2016/1/3.
 */
import { applyFilter } from './filter';

import { uid } from 'uid-safe';

const LOAD_TOKEN = 'session.loadToken';
const LOAD = 'session.load';
const SAVE = 'session.save';

export const SESSION = {
  LOAD_TOKEN,
  LOAD,
  SAVE,
};

function sessionIdCreator() {
  return uid(24);
}

export function createSession(data) {
  return applyFilter(data, sessionIdCreator);
}
