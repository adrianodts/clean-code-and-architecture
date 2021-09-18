FROM node:alpine

WORKDIR /usr/src/app/

COPY package*.json *.sh ./

RUN npm install

COPY . .

CMD ["npm", "run", "test"]