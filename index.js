// re-export HTTPError and helpers
import HTTPError, {
  Redirect,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  GoneError
} from './lib/http-error';

export {
  HTTPError,
  Redirect,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  GoneError
};
