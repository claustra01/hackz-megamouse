# 使用するNode.jsイメージを指定します
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV FLAG "flag{n0t_f0und_m1nu5_0n3}"
EXPOSE 50000

# アプリケーションを実行します
CMD ["node", "index.js"]
