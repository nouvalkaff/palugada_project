FROM node:14

EXPOSE 1927

WORKDIR /palugada

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . .

CMD ["node", "./app.js"]