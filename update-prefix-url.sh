#!/bin/sh

# Update the static files to respect the URL_PATH environment variable
if [ -n "$URL_PATH" ]; then
  # Ensure URL_PATH starts with a slash if it's not empty and doesn't start with one
  if [ "${URL_PATH:0:1}" != "/" ]; then
    URL_PATH="/${URL_PATH}"
  fi

  # Remove trailing slash from URL_PATH if it ends with one
  if [ "${URL_PATH: -1}" = "/" ]; then
    URL_PATH="${URL_PATH%?}"
  fi

  # Update the static file paths in the build directory
  for file in /usr/src/app/client/build/static/js/*.js; do
    sed -i "s|%PUBLIC_URL%|${URL_PATH}|g" "$file"
  done
  for file in /usr/src/app/client/build/static/css/*.css; do
    sed -i "s|%PUBLIC_URL%|${URL_PATH}|g" "$file"
  done

  # Update server.js to set PrefixUrl
  sed -i "s|let PrefixUrl = .*|let PrefixUrl = \"${URL_PATH}\";|g" /usr/src/app/server/server.js

  # Update prefix_conf.js to set PREFIX_URL
  sed -i "s|PREFIX_URL: .*|PREFIX_URL: \"${URL_PATH}\"|g" /usr/src/app/client/build/prefix_conf.js
fi
