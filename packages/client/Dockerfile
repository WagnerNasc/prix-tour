FROM node:20.10-alpine AS client-dev

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

EXPOSE 5173

CMD sh -c "yarn && yarn start"
