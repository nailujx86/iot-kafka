FROM node:14-alpine
WORKDIR /home/node/app
RUN apk add --update bash g++ ca-certificates lz4-dev musl-dev cyrus-sasl-dev openssl-dev make python
RUN chown -R node:node /home/node/app
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
CMD ["npm", "start"]