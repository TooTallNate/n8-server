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

ENTRY_POINT=
NODE_ARGS="--require source-map-support/register"
ARGS=
while [ "x$1" != "x" ]
  do
  case "$1" in
    -h|--help|-v|--version)
      # single argument option names that should be handled by `server.js`
      ARGS="$ARGS "$1""
      ;;
    -p|--port|-P|--portfile)
      # two argument option names that should be handled by `server.js`
      ARGS="$ARGS "$1" "$2""
      shift
      ;;
    --expose_gc|--expose-gc)
      # single argument node options should be handled here
      NODE_ARGS="$NODE_ARGS "$1""
      ;;
    --harmony-*)
      # harmony flags are JS new feature flags
      NODE_ARGS="$NODE_ARGS "$1""
      ;;
    -*)
      # two argument node options should be caught here
      NODE_ARGS="$NODE_ARGS "$1" "$2""
      shift
      ;;
    *)
      # the first thing that doesn't start with a hypen and
      # hasn't been skipped over is the entry point
      ENTRY_POINT="$1"
      shift
      break
      ;;
    esac
  shift
done

# anything left is script args
ARGS="$ARGS "$@""

# debug
#echo "Entry: $ENTRY_POINT"
#echo "Node args: $NODE_ARGS"
#echo "Server args: $ARGS"
#echo exec "$NODE" "$NODE_ARGS" "$DIR/build/server.js" "$ENTRY_POINT" "$ARGS"

exec "$NODE" $NODE_ARGS "$DIR/build/server.js" "$ENTRY_POINT" $ARGS
