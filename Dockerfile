# Settings.
ARG USER_ID=3001
ARG USER_NAME=sage
ARG SOURCE_DIR=/$USER_NAME/source
ARG NPM_REGISTRY=upstream
ARG NODE_ENV=development

# ----------------------------------------------------------------------
# Stage 1: Build a dedicated Node.js image to copy binaries from.
# ----------------------------------------------------------------------
FROM node:20.12.2-alpine AS node

# ----------------------------------------------------------------------
# Stage 2: Build SAGE artifact with Maven. Specific versions of Node.js,
# Python, and build tools are required for node-sass.
# ----------------------------------------------------------------------
FROM maven:3-eclipse-temurin-25-alpine AS maven
ARG USER_ID
ARG USER_NAME
ARG SOURCE_DIR
ARG NPM_REGISTRY
ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

# Create the user and group (use a high ID to attempt to avoid conflicts).
RUN addgroup -g $USER_ID $USER_NAME && \
    adduser -D -h /$USER_NAME -u $USER_ID -G $USER_NAME $USER_NAME

# Install Nodejs, npm, python, and other build tools.
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
      build-base \
      make \
      python3 py3-setuptools \
      g++ libstdc++ && \
    apk add --no-cache

COPY --from=node /usr/local/bin/ /usr/local/bin/
COPY --from=node /usr/local/lib/ /usr/local/lib/
COPY --from=node /usr/local/share/ /usr/local/share/
COPY --from=node /usr/local/include/ /usr/local/include/

RUN rm -rf /var/cache/apk/* && \
    node -v && npm -v

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
COPY ./build/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

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

RUN mvn dependency:resolve

# Build.
RUN mvn package -Pjar -DskipTests

# ----------------------------------------------------------------------
# Stage 3: Normal JRE Stage to run SAGE artifact with Java.
# ----------------------------------------------------------------------
FROM eclipse-temurin:25-jre-alpine
ARG USER_ID
ARG USER_NAME
ARG SOURCE_DIR

RUN apk update && \
    apk upgrade && \
    apk add --no-cache gettext bash && \
    rm -rf /var/cache/apk/*

# Copy files from outside docker to inside.
COPY build/appConfig.js.template /usr/local/app/templates/appConfig.js.template
COPY build/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Enable execute of docker entrypoint for root user.
RUN chmod ugo+r /usr/local/app/templates/appConfig.js.template && \
    chmod ugo+rx /usr/local/bin/docker-entrypoint.sh

# Create the user and group (use a high ID to attempt to avoid conflicts).
RUN addgroup -g $USER_ID $USER_NAME && \
    adduser -D -h /$USER_NAME -u $USER_ID -G $USER_NAME $USER_NAME

# Set deployment directory.
WORKDIR /$USER_NAME

# Login as user.
USER $USER_NAME

# Copy over the built artifact and library from the maven image.
COPY --from=maven $SOURCE_DIR/target/ROOT.jar ./sage.jar
COPY --from=maven $SOURCE_DIR/target/libs ./libs
COPY --from=maven $SOURCE_DIR/build/docker-entrypoint.sh ./build/docker-entrypoint.sh

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
