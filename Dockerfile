FROM node:14

WORKDIR /app

COPY ["scriptDB.js", "package-lock.json", "package.json", "/app" ]

RUN npm install

CMD ["node", "scriptDB.js"]