FROM node:18-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install --force 

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]