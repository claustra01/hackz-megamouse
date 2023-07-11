FROM golang:1.18-alpine AS build

WORKDIR /build

COPY . .
RUN GOOS=js GOARCH=wasm go build -o main.wasm
RUN cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .

################################
FROM nginx:latest
ENV TZ /usr/share/zoneinfo/Asia/Tokyo

ADD default.conf /etc/nginx/conf.d

WORKDIR /etc/nginx/html
COPY --from=build /build/index.html .
COPY --from=build /build/main.wasm .
COPY --from=build /build/wasm_exec.js .

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]