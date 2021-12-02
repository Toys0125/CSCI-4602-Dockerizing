# Uses NodeJS version 12
FROM node:12 

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
ADD build/server.js ./

RUN npm install

EXPOSE 3000
CMD [ "node", "server.js" ]