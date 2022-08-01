# Settings.
ARG PROFILE=production
ARG USER_ID=3001
ARG USER_NAME=sage
ARG HOME_DIR=/$USER_NAME
ARG SOURCE_DIR=$HOME_DIR/source
ARG NPM_REGISTRY_URL=upstream
ARG NODE_ENV=development

# Maven stage.
FROM maven:3-openjdk-11-slim as maven
ARG PROFILE
ARG USER_ID
ARG USER_NAME
ARG HOME_DIR
ARG SOURCE_DIR
ARG NPM_REGISTRY_URL
ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

# Create the group (use a high ID to attempt to avoid conflits).
RUN groupadd --non-unique -g $USER_ID $USER_NAME

# Create the user (use a high ID to attempt to avoid conflits).
RUN useradd --non-unique -d $HOME_DIR -m -u $USER_ID -g $USER_ID $USER_NAME

# Install stable Nodejs and npm.
RUN \
  apt-get update \
  && apt-get -y install nodejs npm iproute2 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && npm cache clean -f \
  && npm install -g n \
  && n stable

# Set deployment directory.
WORKDIR $SOURCE_DIR

# Copy files over.
COPY ./pom.xml ./pom.xml
COPY ./.wvr/build-config.js ./.wvr/build-config.js
COPY ./src ./src
COPY ./build ./build
COPY ./package.json ./package.json

# Copy NPM registry helper script.
COPY build/docker-npmrc.sh ${SOURCE_DIR}/docker-npmrc.sh

# Assign file permissions.
RUN chown -R ${USER_ID}:${USER_ID} ${SOURCE_DIR}

# Login as user.
USER $USER_NAME

# Perform actions.
RUN echo $NPM_REGISTRY_URL
RUN bash ${SOURCE_DIR}/docker-npmrc.sh $NPM_REGISTRY_URL

# Build.
RUN mvn package -Pjar -DskipTests

# Switch to Normal JRE Stage.
FROM openjdk:11-jre-slim
ARG USER_ID
ARG USER_NAME
ARG HOME_DIR
ARG SOURCE_DIR

RUN \
  apt-get update \
  && apt-get -y install gettext-base \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Copy files from outside docker to inside.
COPY build/appConfig.js.template /usr/local/app/templates/appConfig.js.template
COPY build/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Enable execute of docker entrypoint for root user.
RUN \
  chmod ugo+r /usr/local/app/templates/appConfig.js.template \
  && chmod ugo+rx /usr/local/bin/docker-entrypoint.sh

# Create the group (use a high ID to attempt to avoid conflits).
RUN groupadd --non-unique -g $USER_ID $USER_NAME

# Create the user (use a high ID to attempt to avoid conflits).
RUN useradd --non-unique -d $HOME_DIR -m -u $USER_ID -g $USER_ID $USER_NAME

# Login as user.
USER $USER_NAME

# Set deployment directory.
WORKDIR $HOME_DIR

# Copy over the built artifact and library from the maven image.
COPY --from=maven $SOURCE_DIR/target/ROOT.jar ./sage.jar
COPY --from=maven $SOURCE_DIR/target/libs ./libs

ENV AUTH_STRATEGY weaverAuth

ENV STOMP_DEBUG false

ENV AUTH_SERVICE_URL http://localhost:9001/auth
ENV AVALON_URL avalon-pre.library.tamu.edu:443

ENV APP_CONFIG_PATH=file:$HOME_DIR/appConfig.js

EXPOSE 9000

# Entrypoint to perform environment substitution on appConfig.js.
ENTRYPOINT ["docker-entrypoint.sh"]

# Run java command.
CMD ["java", "-jar", "./sage.jar"]
