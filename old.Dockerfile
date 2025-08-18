FROM node:20.17.0-alpine3.19

WORKDIR /usr/src/workspace/devnology-api

CMD [ -d "node_modules" ] && npm run start:dev || npm i && npm run start:dev

EXPOSE 3001