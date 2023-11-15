FROM node:18-slim

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]