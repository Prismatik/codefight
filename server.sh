#!/bin/sh

PORT=${1:-$(($RANDOM % 32768 + 1024))}
echo "Listening on port $PORT. Press Ctrl-C to exit." >&2
get() { curl -sS "$1"; }

while {
	echo "{"
	echo "\"twitter\": $(get "http://codefight.davidbanham.com/twitter"), "
	echo "\"facebook\": $(get "http://codefight.davidbanham.com/facebook"), "
	echo "\"instagram\": $(get "http://codefight.davidbanham.com/instagram")"
	echo "}"
} | nc -l "$PORT"; do :; done
