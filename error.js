import { parse } from 'url';
import HTTPError from './lib/http-error';

export default async function endpoint (req, res) {
  console.log(req.headers);
  const code = +req.headers['x-status-code'] || 500;
  const err = new HTTPError(code);
  if (err.statusCode === 404) {
    const pathname = parse(req.url);
    err.message = `API endpoint "${req.method} ${pathname}" does not exist`;
  }
  throw err;
}
