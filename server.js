import args from 'args';
import DEBUG from 'debug';
import { sync as resolve } from 'resolve';
import { writeFileSync as write, unlinkSync as unlink } from 'fs';
import { createServer } from 'http';
import { isAbsolute, join } from 'path';
import { readable as isReadableStream } from 'is-stream';
import { name as packageName, version as packageVersion } from './package.json';

const debug = DEBUG('n8-server');

args
  .option(['p', 'port'], 'The port that the server should bind to (defaults to an ephemeral port)')
  .option(['P', 'portfile'], 'File where the bound port number will be written to (optional)');

const argv = args.parse(process.argv, {
  name: packageName,
  value: 'server.js',

  // custom `--help` rendering
  usageFilter(output) {
    return output + `
  Examples:

    $ n8-server server.js --port 8080

  Node.js options may also be applied before the script name:

    $ n8-server -r dotenv/config server.js
    $ n8-server --expose-gc server.js

  ${packageName} version v${packageVersion}
  ${process.title} version ${process.version} (${process.execPath || process.argv[0]})
`;

  }
});

debug('parsed argv: %o', argv);
process.parsedArgv = argv
process.sub = args.sub

let filename = args.sub[0];
let port = argv.port || parseInt(process.env.PORT, 10) || 0;
let portfile = argv.portfile;

if (!filename) {
  args.showHelp();
}

if ('error' === filename) {
  filename = './error.js';
} else if (!isAbsolute(filename)) {
  const cwd = process.cwd()
  try {
    // try module name lookup
    filename = resolve(filename, { basedir: cwd });
  } catch (e) {
    // otherwise it's a relative path filename
    filename = join(cwd, filename)
  }
}

const statusCodes = {
  EACCES: 403,
  ENOENT: 404,
  ENOTFOUND: 404
};

debug('entry point: %o', filename);
let mod = require(filename);
if (mod.default) mod = mod.default;

if ('function' !== typeof mod) {
  throw new TypeError(`A function must be exported. Got "${typeof mod}"`);
}

export function makeEnumerableError (err) {
  const copy = {};
  copy.name = err.name;
  copy.message = err.message;
  Object.assign(copy, err);
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
    let code = parseInt(err.statusCode, 10) || statusCodes[err.code] || 500;

    if (code >= 500 && code < 600) {
      // print 5xx server error stack traces to the server log
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

  const rtn = mod(req, res);
  Promise.resolve(rtn).then(onResponse, onError);
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

/**
 * Graceful shutdown.
 */

let shuttingDown = false;
function gracefulShutdown () {
  if (shuttingDown) {
    debug('hard quitting');
    process.exit(1);
  } else {
    shuttingDown = true;
    debug('attempting graceful shutdown');
    process.emit('gracefulShutdown');
  }
}

// simply log unhandled rejections, like Chrome does
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled promise rejection:\n' + err.stack);
  gracefulShutdown();
});

// delete the "ports" file
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
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
