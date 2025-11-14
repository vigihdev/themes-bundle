#!/bin/bash
# grunt.sh

GLOBAL_NPM="$HOME/.nvm/versions/node/v18.12.1/lib"
PROJECT_DIR=$(pwd)
GRUNTFILE="$PROJECT_DIR/Gruntfile.js"

# node $PROJECT_DIR/src/scripts/dotEnv.js
cp -r $GRUNTFILE $GLOBAL_NPM
cd $GLOBAL_NPM
grunt $1