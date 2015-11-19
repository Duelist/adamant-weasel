#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

if [ -f "../logs/app.log" ]; then
  rm "../logs/app.log"
fi
