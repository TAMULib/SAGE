#!/bin/sh
# Requires: printenv, envsubst, head.

set -e

printenv

echo "Templating appConfig.js"
envsubst < /usr/local/app/templates/appConfig.js.template > appConfig.js
echo "Done"
head -n 20 appConfig.js


### Below is the injecting script that will inject the txt files into the placeholder###
### into the index.html file incase you do not want it to be built within the Docker image###

# Specify the directories containing the JavaScript and HTML files
# jsfiles_dir="./build/"
# htmlfiles_dir="./src/main/resources/templates/"

# Encode the scripts
# ga4=$(cat "${jsfiles_dir}Ga4.txt")
# gtm=$(cat "${jsfiles_dir}Gtm.txt")

# Remove any newline characters
# ga4_one_line=$(echo "$ga4" | tr -d '\n')
# gtm_one_line=$(echo "$gtm" | tr -d '\n')

# #escape the special characters for sed commands
# ga4_escaped=$(echo "$ga4_one_line" | sed -e 's/[\/&]/\\&/g')
# gtm_escaped=$(echo "$gtm_one_line" | sed -e 's/[\/&]/\\&/g')

# Inject the scripts
# sed -i "s#<!--google Analytics Tag -->#${ga4_escaped}#g" "${htmlfiles_dir}index.html"
# sed -i "s#<!-- Google Tag Manager (noscript) -->#${gtm_escaped}#g" "${htmlfiles_dir}index.html"

# chown -R $USER_NAME:$USER_NAME ./src/main/resources/templates && chmod -R u+rw ./src/main/resources/templates

echo "Done docker-entrypoint..."

exec "$@"
