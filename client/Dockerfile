FROM node:18-alpine

WORKDIR /opt/client

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev"]
# RUN npm run build
# CMD ["npm", "start"]