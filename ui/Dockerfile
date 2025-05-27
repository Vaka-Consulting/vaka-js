FROM node:22

COPY applications/web3-app/package.json /app/applications/web3-app/package.json
COPY packages /app/packages
COPY package.json yarn.lock /app/

WORKDIR /app

RUN yarn install && \
    cd /app/applications/web3-app && \
    yarn install


WORKDIR /app/applications/web3-app

ENTRYPOINT ["/usr/bin/bash", "-c"]

CMD [ "yarn install && yarn dev" ]