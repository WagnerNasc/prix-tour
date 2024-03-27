FROM node:20.10-alpine

RUN apk update && \
apk add openssl && \
apk add openssl-dev && \
apk add libc6-compat && \
apk add libssl1.1 && \
apk add curl && \
apk add wget && \
apk add git && \
apk add yarn

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
    yarn && \
    yarn workspace server migrate up && \
    yarn workspace server seed && \
    yarn start