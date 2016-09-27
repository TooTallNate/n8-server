import DEBUG from 'debug';
import minimist from 'minimist';
import { writeFileSync as write, unlinkSync as unlink } from 'fs';
import { createServer } from 'http';
import { isAbsolute, resolve } from 'path';
import { readable as isReadableStream } from 'is-stream';

const debug = DEBUG('n8-server');
const argv = minimist(process.argv.slice(2));

let filename = argv._.shift();
let port = argv.port || parseInt(process.env.PORT, 10) || 0;
let portfile = argv.portfile;

if (!filename) {
  throw new Error('A server filename must be given!');
}

if ('error' === filename) {
  filename = './error.js';
} else if (!isAbsolute(filename)) {
  filename = resolve(filename);
}

const statusCodes = {
  EACCES: 403,
  ENOENT: 404,
  ENOTFOUND: 404
};

let mod = require(filename);
if (mod.default) mod = mod.default;

if ('function' !== typeof mod) {
  throw new TypeError(`A function must be exported. Got "${ typeof mod }"`);
}

export function makeEnumerableError (err) {
  const copy = {};
  copy.name = err.name;
  copy.message = err.message;
  Object.keys(err).forEach((k) => copy[k] = err[k]);
  if (copy.stack) copy.stack = undefined;
  return copy;
}

const server = createServer((req, res) => {
  function onResponse (val) {
    if (!val) return res.end();
    if (isReadableStream(val)) return val.pipe(res);

    let length;
    if (Buffer.isBuffer(val)) {
      length = val.length;
    } else if ('object' === typeof val) {
      // assume a plain object, JSON stringify
      val = JSON.stringify(val, null, 2) + '\n';
      res.setHeader('Content-Type', 'application/json; charset=utf8');
    }

    if ('string' === typeof val) {
      length = Buffer.byteLength(val);
    }
    if ('number' === typeof length) {
      res.setHeader('Content-Length', length);
    }
    res.end(val);
  }

  function onError (err) {
    let code = err.statusCode || statusCodes[err.code] || 500;

    if (code < 400 || code >= 500) {
      // print non-4xx stack traces to the server log
      console.error(err.stack);
    }

    res.statusCode = code;

    if (err.headers) {
      Object.keys(err.headers).forEach((name) => {
        res.setHeader(name, err.headers[name]);
      });
    }

    // Error will be JSON stringified in response
    onResponse(makeEnumerableError(err));
  }

  mod(req, res).then(onResponse, onError);
});

process.once('gracefulShutdown', () => server.close());

// hook for any last-minute listeners on `server`.
// for example, this would be a good place to set up `socket.io`
process.emit('server', server);

server.listen(port, (err) => {
  if (err) throw err;
  port = server.address().port;

  console.log('listening on port %d', port);

  if (portfile) {
    write(portfile, String(port), 'ascii');
  }
});

let shuttingDown = false;
function gracefulShutdown () {
  if (shuttingDown) return;
  shuttingDown = true;
  process.emit('gracefulShutdown');
}

// simply log unhandled rejections, like Chrome does
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled promise rejection:\n' + err.stack);
  gracefulShutdown();
});

// delete the "ports" file
process.on('SIGINT', gracefulShutdown);
process.on('SIGQUIT', gracefulShutdown);

process.on('beforeExit', () => {
  if (portfile) {
    try {
      unlink(portfile);
    } catch (e) {
      console.error(e.stack);
    }
  }
});
