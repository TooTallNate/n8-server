v2.1.1 2016-10-12

* [[`90054a6417`](https://github.com/TooTallNate/n8-server/commit/90054a6417)] - **run**: fix `--port` / `--portfile` before the entry file (Nathan Rajlich)

v2.1.0 2016-10-11

* [[`729612a14d`](https://github.com/TooTallNate/n8-server/commit/729612a14d)] - **server**: use multi-line ES6 string (Nathan Rajlich)
* [[`67371a96af`](https://github.com/TooTallNate/n8-server/commit/67371a96af)] - **server**: better --help output (Nathan Rajlich)
* [[`89d0f14ccc`](https://github.com/TooTallNate/n8-server/commit/89d0f14ccc)] - preprocess arguments in order to support node options (Nathan Rajlich)

v2.0.1 2016-10-02

* [[`f732ec091c`](https://github.com/TooTallNate/n8-server/commit/f732ec091c)] - **package**: update "args" to v2.1.0 (Nathan Rajlich)

v2.0.0 2016-10-01

* [[`bd51d2a78d`](https://github.com/TooTallNate/n8-server/commit/bd51d2a78d)] - add -p and -P aliases (Nathan Rajlich)
* [[`91c0d00c40`](https://github.com/TooTallNate/n8-server/commit/91c0d00c40)] - use "args" module (Nathan Rajlich)
* [[`45c2631bb9`](https://github.com/TooTallNate/n8-server/commit/45c2631bb9)] - use "debug" (Nathan Rajlich)
* [[`8c394eb4fb`](https://github.com/TooTallNate/n8-server/commit/8c394eb4fb)] - initial ava tests (Nathan Rajlich)
* [[`86326e4f5b`](https://github.com/TooTallNate/n8-server/commit/86326e4f5b)] - **run**: use `exec` (Nathan Rajlich)
* [[`f830a6bcea`](https://github.com/TooTallNate/n8-server/commit/f830a6bcea)] - **error**: fix 404 endpoint message (Nathan Rajlich)
* [[`ce51a8980d`](https://github.com/TooTallNate/n8-server/commit/ce51a8980d)] - **server**: add support for regular functions (Nathan Rajlich)
* [[`4d6d6ba371`](https://github.com/TooTallNate/n8-server/commit/4d6d6ba371)] - **server**: gracefully shutdown upon SIGTERM (Nathan Rajlich)
* [[`94fe0e37ff`](https://github.com/TooTallNate/n8-server/commit/94fe0e37ff)] - **server**: add a "hard quit" upon second shutdown signal (Nathan Rajlich)
* [[`3c81058c86`](https://github.com/TooTallNate/n8-server/commit/3c81058c86)] - **server**: remove error message that never happens (Nathan Rajlich)
* [[`b59a59d199`](https://github.com/TooTallNate/n8-server/commit/b59a59d199)] - **server**: better error message when no port is specified (Nathan Rajlich)
* [[`06392f55d5`](https://github.com/TooTallNate/n8-server/commit/06392f55d5)] - **server**: emit "server" event on `process` (Nathan Rajlich)
* [[`b67a3bf2d4`](https://github.com/TooTallNate/n8-server/commit/b67a3bf2d4)] - random tweaks (Nathan Rajlich)

v1.5.0 2016-09-25

* [[`37e5811a63`](https://github.com/TooTallNate/n8-server/commit/37e5811a63)] - add `GoneError` for 410 status code (Nathan Rajlich)

v1.4.0 2016-09-24

* [[`08867f3c32`](https://github.com/TooTallNate/n8-server/commit/08867f3c32)] - **server**: emit "gracefulShutdown" on process (Nathan Rajlich)

v1.3.0 2016-09-23

* [[`086c44518a`](https://github.com/TooTallNate/n8-server/commit/086c44518a)] - **server**: add support for `headers` object on Errors (Nathan Rajlich)

v1.2.0 2016-09-12

* [[`ee4f76f078`](https://github.com/TooTallNate/n8-server/commit/ee4f76f078)] - add HTTP Error server `n8-server error --port 8080` (Nathan Rajlich)
* [[`f1469704bf`](https://github.com/TooTallNate/n8-server/commit/f1469704bf)] - add `HTTPError` and helper classes (Nathan Rajlich)
* [[`e914f0b939`](https://github.com/TooTallNate/n8-server/commit/e914f0b939)] - properly resolve the module root (Nathan Rajlich)
* [[`b2487c7ffc`](https://github.com/TooTallNate/n8-server/commit/b2487c7ffc)] - **run**: use the full `--require` flag on node (Nathan Rajlich)

v1.1.0 2016-06-03

* [[`72c4655232`](https://github.com/TooTallNate/n8-server/commit/72c4655232)] - **server**: add `--portfile path/to/portfile` CLI argument (Nathan Rajlich)

v1.0.3 2016-06-03

* [[`7b9ef21ab7`](https://github.com/TooTallNate/n8-server/commit/7b9ef21ab7)] - **run**: another attempt at getting dirname of script (Nathan Rajlich)

v1.0.2 2016-06-03

* [[`b93ad0693c`](https://github.com/TooTallNate/n8-server/commit/b93ad0693c)] - **run**: simpler and more portable DIR logic (Nathan Rajlich)
* [[`f0e44f6b7d`](https://github.com/TooTallNate/n8-server/commit/f0e44f6b7d)] - **npmignore**: ignore `node_modules` (Nathan Rajlich)

v1.0.1 2016-06-03

* [[`492140e3db`](https://github.com/TooTallNate/n8-server/commit/492140e3db)] - attempt to publish the `build` dir (Nathan Rajlich)

v1.0.0 2016-06-03

* [[`c960bcf36c`](https://github.com/TooTallNate/n8-server/commit/c960bcf36c)] - **package**: run `n8-make build` upon "prepublish" (Nathan Rajlich)
* [[`68e855bb67`](https://github.com/TooTallNate/n8-server/commit/68e855bb67)] - **server**: hoist out the port filename logic (Nathan Rajlich)
* [[`d4b9f90c5c`](https://github.com/TooTallNate/n8-server/commit/d4b9f90c5c)] - **run**: add "source-map-support" (Nathan Rajlich)
* [[`8619fc92eb`](https://github.com/TooTallNate/n8-server/commit/8619fc92eb)] - **run**: add some comments (Nathan Rajlich)
* [[`f821d67f93`](https://github.com/TooTallNate/n8-server/commit/f821d67f93)] - **server**: add `SIGINT` signal handler (Nathan Rajlich)
* [[`a2ab9e977b`](https://github.com/TooTallNate/n8-server/commit/a2ab9e977b)] - **run**: add clarifying comment (Nathan Rajlich)
* [[`9074447d6b`](https://github.com/TooTallNate/n8-server/commit/9074447d6b)] - **server**: remove she bang (Nathan Rajlich)
* [[`8bc1229b92`](https://github.com/TooTallNate/n8-server/commit/8bc1229b92)] - **run**: add `$DIR/node_modules` to NODE_PATH (Nathan Rajlich)
* [[`2f492a8e4d`](https://github.com/TooTallNate/n8-server/commit/2f492a8e4d)] - Use a wrapper `run.sh` script (Nathan Rajlich)
* [[`b191245527`](https://github.com/TooTallNate/n8-server/commit/b191245527)] - **run**: add credit to technique (Nathan Rajlich)
* [[`855c128a40`](https://github.com/TooTallNate/n8-server/commit/855c128a40)] - **server**: map EACCES errors to 403 HTTP status code (Nathan Rajlich)
* [[`2b00198d3a`](https://github.com/TooTallNate/n8-server/commit/2b00198d3a)] - add intermediary `run.js` script (Nathan Rajlich)
* [[`ed5b38d0d7`](https://github.com/TooTallNate/n8-server/commit/ed5b38d0d7)] - initial commit (Nathan Rajlich)
