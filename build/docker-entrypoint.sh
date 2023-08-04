#!/bin/bash
# Requires: printenv, envsubst, head.

set -e

printenv

echo "Templating appConfig.js"
envsubst < /usr/local/app/templates/appConfig.js.template > appConfig.js
echo "Done"
head -n 20 appConfig.js

# Check if ENVIRONMENT variable is set to "production"
if [ "$NODE_ENV" = "production" ]; then
  echo "Running in production environment"
  
### Below is the injecting script that will inject the txt files into the placeholder###
### that is in the index.html file incase you do not want it to be built within the Docker image###
### only when the environment variable is set production###

# # Specify the directories containing the JavaScript and HTML files
# jsfiles_dir="./build/"
# htmlfiles_dir="./src/main/resources/templates/"

# # Encode the scripts
# ga4=$(cat "${jsfiles_dir}Ga4.txt")
# gtm=$(cat "${jsfiles_dir}Gtm.txt")

# # Remove any newline characters
# ga4_one_line=$(echo "$ga4" | tr -d '\n')
# gtm_one_line=$(echo "$gtm" | tr -d '\n')

# # #escape the special characters for sed commands
# ga4_escaped=$(echo "$ga4_one_line" | sed -e 's/[\/&]/\\&/g')
# gtm_escaped=$(echo "$gtm_one_line" | sed -e 's/[\/&]/\\&/g')

# # Inject the scripts
# sed -i "s#<!--google Analytics Tag -->#${ga4_escaped}#g" "${htmlfiles_dir}index.html"
# sed -i "s#<!-- Google Tag Manager (noscript) -->#${gtm_escaped}#g" "${htmlfiles_dir}index.html"

else
  echo "Not running in production environment"
fi

echo "Done docker-entrypoint..."

exec "$@"
