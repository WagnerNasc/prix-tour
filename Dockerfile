FROM node:20.10-alpine

RUN apk update && \
apk add --no-cache -v \
openssl \
openssl-dev \
libc6-compat \
curl \
wget \
git \
yarn

ENV HOME=/usr/src/app

WORKDIR ${HOME}

COPY yarn.lock ./

RUN yarn

USER root

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

COPY . .

EXPOSE 3000

CMD /wait && \
    sh -c yarn && \ 
    yarn migrate && \
    yarn seed && \
    yarn start