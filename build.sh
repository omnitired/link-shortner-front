#!/bin/sh
set -e
npm ci
echo "installed"

echo building 
npm run build
cd build

gzip -5kfr *
