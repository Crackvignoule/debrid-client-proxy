#!/bin/sh

################################################################################
# This script is used to update the static files to respect the URL_PREFIX environment variable.
# Since the static files for client are built before the environment variables can be set by the user,
# this script is used to update the static files to respect the URL_PREFIX environment variable.
# This script is run by the container when it starts.

# How it works:
# 1. index.html loads a prefix_conf.js file which sets the URL_PREFIX variable.
# 2. The static files are built with %PUBLIC_URL% as the placeholder for the URL_PREFIX.
# 3. This script replaces %PUBLIC_URL% with the URL_PREFIX in the static files.
# 4. This script also updates the server.js file to set the PrefixUrl variable. This is used by the server to serve the static files with the correct URL.
# 5. This script also updates the prefix_conf.js file to set the URL_PREFIX variable. This is used by the client to make API requests to the server with the correct URL.
################################################################################

# Update the static files to respect the URL_PREFIX environment variable
if [ -n "$URL_PREFIX" ]; then
  # Ensure URL_PREFIX starts with a slash if it's not empty and doesn't start with one
  if [ "${URL_PREFIX:0:1}" != "/" ]; then
    URL_PREFIX="/${URL_PREFIX}"
  fi

  # Remove trailing slash from URL_PREFIX if it ends with one
  if [ "${URL_PREFIX: -1}" = "/" ]; then
    URL_PREFIX="${URL_PREFIX%?}"
  fi

  # Update index.html, /static to static
  sed -i "s|/assets|assets|g" /usr/src/app/client/dist/index.html

  # Update the static file paths in the dist directory
  for file in /usr/src/app/client/dist/assets/js/*.js; do
    sed -i "s|%PUBLIC_URL%|${URL_PREFIX}|g" "$file"
  done
  for file in /usr/src/app/client/dist/assets/css/*.css; do
    sed -i "s|%PUBLIC_URL%|${URL_PREFIX}|g" "$file"
  done

  # Update server.js to set PrefixUrl
  sed -i "s|let PrefixUrl = .*|let PrefixUrl = \"${URL_PREFIX}\";|g" /usr/src/app/server/server.js

  # Update prefix_conf.js to set URL_PREFIX
  sed -i "s|URL_PREFIX: .*|URL_PREFIX: \"${URL_PREFIX}\"|g" /usr/src/app/client/dist/prefix_conf.js
fi
