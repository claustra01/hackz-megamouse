FROM golang:1.18-alpine AS build
ENV TZ /usr/share/zoneinfo/Asia/Tokyo

WORKDIR /opt/client

COPY . .
RUN GOOS=js GOARCH=wasm go build -o main.wasm
RUN cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .

################################
FROM nginx:latest

ADD default.conf /etc/nginx/conf.d
COPY --from=build /opt/client/ /etc/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]