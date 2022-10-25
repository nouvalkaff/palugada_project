FROM node:alpine

WORKDIR /palugada

COPY package*.json ./

RUN npm install --silent

COPY . ./

EXPOSE 1927