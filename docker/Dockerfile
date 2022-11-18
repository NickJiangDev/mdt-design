FROM node:14.17.0
ENV TZ Asia/Shanghai
ARG NPM_HOME=/npm
ARG YARN_VERSION=1.22.10

WORKDIR ${NPM_HOME}

COPY package.json yarn.lock .npmrc ./
RUN npm install -g yarn@${YARN_VERSION} --force
# RUN yarn global add npm-cli-login
RUN yarn install --ignore-scripts --ignore-optional --network-timeout 100000 && \
    rm -rf /tmp/*

WORKDIR /mdt-design
