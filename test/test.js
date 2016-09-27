import test from 'ava';
import uid from 'uid-promise';
import { join } from 'path';
import { tmpDir } from 'os';
import fetch from 'node-fetch';
import { readFile } from 'fs-promise';
import { spawn } from 'child_process';

async function server (filename) {
  const portfile = join(tmpDir(), await uid(10));
  const proc = spawn(__dirname + '/../run.sh', [ '--portfile', portfile, filename ], { stdio: 'ignore' });
  let port;
  while (!port) {
    try {
      port = parseInt(await readFile(portfile), 10);
    } catch (e) {
      // ignore...
    }
  }
  return [ proc, port ];
}

test('regular function', async (t) => {
  const [ proc, port ] = await server(__dirname + '/servers/hello.js');
  const req = fetch(`http://localhost:${port}/`);

  const res = await req;
  t.is(res.ok, true);
  t.is(res.headers.get('Content-Type'), 'text/plain; charset=utf8');

  const body = await res.text();
  t.is(body, 'Hello world!');

  proc.kill();
});

test('function returning Promise', async (t) => {
  const [ proc, port ] = await server(__dirname + '/servers/promise.js');
  const req = fetch(`http://localhost:${port}/`);

  const res = await req;
  t.is(res.ok, true);
  t.is(res.headers.get('Content-Type'), 'text/plain; charset=utf8');

  const body = await res.text();
  t.is(body, 'Hello world!');

  proc.kill();
});

test('function returning an Object', async (t) => {
  const [ proc, port ] = await server(__dirname + '/servers/json.js');
  const req = fetch(`http://localhost:${port}/`);

  const res = await req;
  t.is(res.ok, true);
  t.is(res.headers.get('Content-Type'), 'application/json; charset=utf8');

  const body = await res.json();
  t.deepEqual(body, { hello: 'world' });

  proc.kill();
});
