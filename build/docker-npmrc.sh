#!/bin/bash
# Requires ip and awk, but only for docker-linux.

main() {
  if [[ $1 == "docker-linux" ]] ; then
    to_npmrc $(ip route | awk '/^default via/ { print $3 }')
  elif [[ $1 == "docker-windows" || $1 == "docker-mac" ]] ; then
    to_npmrc host.docker.internal
  fi
}

to_npmrc() {
  echo "Setting NPM registry to '$1'."
  echo "registry=http://$1:4873" >> .npmrc
}

main "$@"
