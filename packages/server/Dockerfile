FROM node:20.10-alpine AS server-dev

RUN apk update && \
    apk add --no-cache -v \
    openssl \
    openssl-dev \
    libc6-compat \
    curl \
    wget \
    git \
    yarn

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

COPY . .

EXPOSE 3000

CMD /wait && \
    sh -c yarn && \
    yarn migrate up && \
    yarn seed && \
    yarn start:server
