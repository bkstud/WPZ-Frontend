#!/bin/bash
shopt -s extglob
cp -r !(node_modules) /home/project
cd /home/project
npm install
echo "REACT_APP_BACKEND_ADDRESS=${BACKEND_ADDRESS}" > .env
echo "REACT_APP_BACKEND_PORT=${BACKEND_PORT}" >> .env
export PORT="${PORT:-3000}"
npm start
