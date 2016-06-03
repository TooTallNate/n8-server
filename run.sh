#!/usr/bin/env sh

# this script runs the compiled `server.js` file via Node.js,
# and passes along any arguments passed to the script.
#
# it also exports NODE_PATH such that the `node_modules` directory
# relative to the current working directory will be included in
# the search path

if [ "x$NODE" = "x" ]; then
  NODE=node
fi

# thanks http://stackoverflow.com/a/246128/376773 !
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

# TODO: use a module to find the root of the module (node-bindings has this logic, but it's not exposed)
# (the current logic assumes that `n8-server` is invoked from the root of the module
export NODE_PATH="$PWD/node_modules:$DIR/node_modules:$NODE_PATH"

"$NODE" "$DIR/build/server.js" "$@"
