FROM node as test_base

RUN mkdir -p /expense-manager && \
    mkdir -p /expense-manager/client && \
    mkdir -p /expense-manager/server && \
    chown -R node:node /expense-manager && \
    chown -R node:node /expense-manager/client && \
    chown -R node:node /expense-manager/server && \
    apt-get update || : && apt-get install -y \
    python \
    build-essential

# least privilege user
USER node
USER node

WORKDIR /expense-manager

COPY --chown=node:node client/. ./client
COPY --chown=node:node server/. ./server

WORKDIR /expense-manager/client
RUN npm cache clean --force && npm install
RUN npm run build -- --release

WORKDIR /expense-manager/server
RUN npm install

#-----------------------------------------------------------------------------------------------

# alpine image so use /bin/sh not /bin/bash to enter docker
FROM node:10.15.0-alpine as prod_base

# set timezone to IST in docker
RUN apk upgrade --update \
  && apk add -U tzdata \
  && cp /usr/share/zoneinfo/Asia/Kolkata /etc/localtime \
  && apk del tzdata \
  && rm -rf /var/cache/apk/*

USER node

WORKDIR /expense-manager

# only copy needed assets, node_modules
# etc will be left in test image, super light prod image
COPY --from=test_base --chown=node:node /expense-manager/client/build ./client/build
COPY --from=test_base --chown=node:node /expense-manager/server/node_modules ./server/node_modules
COPY --from=test_base --chown=node:node /expense-manager/server/config ./server/config
COPY --from=test_base --chown=node:node /expense-manager/server/app.js ./server/app.js
COPY --from=test_base --chown=node:node /expense-manager/server/bin/www ./server/bin/www
COPY --from=test_base --chown=node:node /expense-manager/server/views ./server/views
COPY --from=test_base --chown=node:node /expense-manager/server/package.json ./server/package.json



EXPOSE 9000
EXPOSE 3000

ENV NODE_CONFIG_DIR=./server/config

CMD ["sh", "-c", "node ./server/bin/www"]
#CMD ["sh", "-c", "NODE_CONFIG_DIR=${NODE_CONFIG_DIR}", "NODE_ENV=${NODE_ENV}", "node", "server/dist/server.js"]
#CMD ["node", "server/dist/server.js"]