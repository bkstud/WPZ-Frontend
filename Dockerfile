
FROM node:latest

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 
RUN npm config set scripts-prepend-node-path auto
CMD ["npm", "start"]