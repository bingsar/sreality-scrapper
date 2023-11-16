FROM node:16.18-bullseye-slim

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt-get update \
 && apt-get install -y chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]