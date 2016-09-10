#!/usr/bin/env sh

# this script runs the compiled `server.js` file via Node.js,
# and passes along any arguments passed to the script.
#
# it also exports NODE_PATH such that the `node_modules` directory
# relative to the current working directory will be included in
# the search path, as well as n8-server's `node_modules` directory

if [ "x$NODE" = "x" ]; then
  NODE=node
fi

FILENAME=`which $0`
FILENAME=`"$NODE" -pe "require('fs').realpathSync('$FILENAME')"`
DIR=`dirname "$FILENAME"`

export NODE_PATH="$DIR/node_modules:$NODE_PATH"
export NODE_PATH="`"$NODE" -pe "require('module-root')()"`/node_modules:$NODE_PATH"

"$NODE" --require source-map-support/register "$DIR/build/server.js" "$@"
