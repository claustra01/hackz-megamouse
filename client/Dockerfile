FROM node:18-alpine

WORKDIR /opt/client

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

RUN npm run build
CMD ["npm", "start"]