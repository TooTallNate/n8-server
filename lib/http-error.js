import { format } from 'url';
import { STATUS_CODES } from 'http';
import uppercamelcase from 'uppercamelcase';

class HTTPError extends Error {
  constructor(code, message, extras) {
    super(message || STATUS_CODES[code]);
    if (arguments.length >= 3 && extras) {
      Object.assign(this, extras);
    }
    this.name = toName(code);
    this.statusCode = code;
  }
}
export default HTTPError;

/**
 * Converts an HTTP status code to an Error `name`.
 * Ex:
 *   302 => "Found"
 *   404 => "NotFoundError"
 *   500 => "InternalServerError"
 */

export function toName (code) {
  const n = code / 100 | 0;
  const suffix = (n === 4 || n === 5) ? 'error' : '';
  return uppercamelcase(String(STATUS_CODES[code]).replace(/error$/i, ''), suffix);
}

/**
 * A few common instances.
 */

export function Redirect (location, code = 302, extras = {}) {
  if ('object' === typeof location) {
    location = format(location);
  }
  if ('string' !== typeof location) {
    throw new TypeError('A redirection `location` string or object must be given');
  }
  if ((code / 100 | 0) !== 3) {
    throw new TypeError(`\`code\` must be a 3xx redirect status code (i.e. 302), got ${code}`);
  }

  const message = `Redirecting to ${ JSON.stringify(location) }`;
  if (!extras.headers) extras.headers = {};
  extras.headers.Location = location;
  return new HTTPError(code, message, extras);
}

export function BadRequestError (message, extras) {
  return new HTTPError(400, message, extras);
}

export function UnauthorizedError (message, extras = {}) {
  const bearer = extras.bearer;
  if (bearer) {
    if (!extras.headers) extras.headers = {};
    extras.headers['WWW-Authenticate'] = 'Bearer ' + Object.keys(bearer)
      .map((key) => `${key}=${ JSON.stringify(bearer[key]) }`)
      .join(', ');
  } else {
    // 10.4.2: 401 Unauthorized
    // The request requires user authentication. The response MUST include a
    // WWW-Authenticate header field (section 14.47) containing a challenge
    // applicable to the requested resource.
    throw new TypeError('A `bearer` object MUST be given to create the "WWW-Authenticate" HTTP header');
  }
  return new HTTPError(401, message, extras);
}

export function ForbiddenError (message, extras) {
  return new HTTPError(403, message, extras);
}

export function NotFoundError (message, extras) {
  return new HTTPError(404, message, extras);
}

export function GoneError (message, extras) {
  return new HTTPError(410, message, extras);
}
