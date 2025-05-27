FROM node:22


COPY package.json package-lock.json /app/api/

WORKDIR /app/api

RUN npm install

COPY . /app/api

WORKDIR /app/api

ENTRYPOINT ["/usr/bin/bash", "-c"]

CMD ["npm run start:dev"]
