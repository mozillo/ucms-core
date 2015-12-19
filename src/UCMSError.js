/**
 * Created by Yun on 2015-12-19.
 */

export default class UCMSError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
