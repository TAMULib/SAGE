# Settings.
ARG USER_ID=3001
ARG USER_NAME=sage
ARG SOURCE_DIR=/$USER_NAME/source
ARG NPM_REGISTRY=upstream
ARG NODE_ENV=development

# Maven stage.
FROM maven:3-openjdk-11-slim as maven
ARG USER_ID
ARG USER_NAME
ARG SOURCE_DIR
ARG NPM_REGISTRY
ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

# Create the user and group (use a high ID to attempt to avoid conflicts).
RUN groupadd --non-unique -g $USER_ID $USER_NAME && \
    useradd --non-unique -d /$USER_NAME -m -u $USER_ID -g $USER_ID $USER_NAME

# Install stable Nodejs and npm.
RUN apt-get update --fix-missing && \
    apt-get upgrade -y --fix-missing && \
    apt-get install -y nodejs npm iproute2 --fix-missing && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    npm cache clean -f && \
    npm install -g n && \
    n stable

# Ensure source directory exists and has appropriate file permissions.
RUN mkdir -p $SOURCE_DIR && \
    chown $USER_ID:$USER_ID $SOURCE_DIR && \
    chmod g+s $SOURCE_DIR

# Set deployment directory.
WORKDIR $SOURCE_DIR

# Copy in files from outside of docker.
COPY ./pom.xml ./pom.xml
COPY ./.wvr/build-config.js ./.wvr/build-config.js
COPY ./src ./src
COPY ./build ./build
COPY ./build/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY ./package.json ./package.json

USER root
# COPY ./src/main/resources/templates/index.html $SOURCE_DIR/src/main/resources/templates/index.html
COPY ./build/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Set ownership and permissions for the directory and the file
RUN chown -R $USER_ID:$USER_ID $SOURCE_DIR/src/main/resources/templates && \
    chmod -R u+rw $SOURCE_DIR/src/main/resources/templates

RUN chmod ugo+rx /usr/local/bin/docker-entrypoint.sh

# Assign file permissions.
RUN chown -R $USER_ID:$USER_ID $SOURCE_DIR

# Login as user.
USER $USER_NAME

# Perform actions.
RUN echo $NPM_REGISTRY && \
    bash $SOURCE_DIR/build/docker-npmrc.sh $NPM_REGISTRY

# Copy in your index.html file and modify it before the mvn package command
COPY ./src/main/resources/templates/index.html $SOURCE_DIR/src/main/resources/templates/index.html
# RUN chmod u+rw $SOURCE_DIR/src/main/resources/templates/index.html


# Injection script to be built into the image
RUN if [ "$NODE_ENV" = "production" ]; then \
        ga4=$(cat ./build/Ga4.txt) && \
        gtm=$(cat ./build/Gtm.txt) && \
        ga4_one_line=$(echo "$ga4" | tr -d '\n') && \
        gtm_one_line=$(echo "$gtm" | tr -d '\n') && \
        ga4_escaped=$(echo "$ga4_one_line" | sed -e 's/[\/&]/\\&/g') && \
        gtm_escaped=$(echo "$gtm_one_line" | sed -e 's/[\/&]/\\&/g') && \
        sed -i "s#<!--google Analytics Tag -->#${ga4_escaped}#g" $SOURCE_DIR/src/main/resources/templates/index.html && \
        sed -i "s#<!-- Google Tag Manager (noscript) -->#${gtm_escaped}#g" $SOURCE_DIR/src/main/resources/templates/index.html; \
        fi

# Build.
RUN mvn package -Pjar -DskipTests

# Switch to Normal JRE Stage.
FROM openjdk:11-jre-slim
ARG USER_ID
ARG USER_NAME
ARG SOURCE_DIR

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get -y install gettext-base && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy files from outside docker to inside.
COPY build/appConfig.js.template /usr/local/app/templates/appConfig.js.template
COPY build/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Enable execute of docker entrypoint for root user.
RUN chmod ugo+r /usr/local/app/templates/appConfig.js.template && \
    chmod ugo+rx /usr/local/bin/docker-entrypoint.sh

# Create the user and group (use a high ID to attempt to avoid conflicts).
RUN groupadd --non-unique -g $USER_ID $USER_NAME && \
    useradd --non-unique -d /$USER_NAME -m -u $USER_ID -g $USER_ID $USER_NAME

# Set deployment directory.
WORKDIR /$USER_NAME

# Login as user.
USER $USER_NAME

# Copy over the built artifact and library from the maven image.
COPY --from=maven $SOURCE_DIR/target/ROOT.jar ./sage.jar
COPY --from=maven $SOURCE_DIR/target/libs ./libs
COPY --from=maven $SOURCE_DIR/build/Ga4.txt ./build/Ga4.txt
COPY --from=maven $SOURCE_DIR/build/Gtm.txt ./build/Gtm.txt
COPY --from=maven $SOURCE_DIR/src/main/resources/templates/index.html ./src/main/resources/templates/index.html

# Make sure the user has the necessary permissions on the templates directory and its contents
# USER root
# RUN chown -R $USER_NAME:$USER_NAME ./src/main/resources/templates && \
#     chmod -R a+rw ./src/main/resources/templates
# USER sage

# Make sure the user has the necessary permissions on index.html
RUN chown $USER_NAME:$USER_NAME ./src/main/resources/templates/index.html && chmod u+rw ./src/main/resources/templates/index.html

ENV AUTH_STRATEGY=weaverAuth

ENV STOMP_DEBUG=false

ENV AUTH_SERVICE_URL=http://localhost:9001/auth
ENV AVALON_URL=avalon-pre.library.tamu.edu:443

ENV APP_CONFIG_PATH=file:/$USER_NAME/appConfig.js

EXPOSE 9000

# Entrypoint performs environment substitution on appConfig.js.
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# Run java command.
CMD ["java", "-jar", "./sage.jar"]
