#!/bin/bash
shopt -s extglob
cp -r !(node_modules) /home/project
cd /home/project
npm install
export PORT="${PORT:-3000}"
npm start
