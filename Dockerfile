FROM node:14

COPY package*.json ./

WORKDIR /app

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
