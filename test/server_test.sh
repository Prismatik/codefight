#!/bin/sh

PORT=$(($RANDOM % 32768 + 1024))
"$(dirname "$0")"/../server.sh $PORT &
SERVER_PID=$!

sleep 1
nc localhost $PORT
kill $SERVER_PID
