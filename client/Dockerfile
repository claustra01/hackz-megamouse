FROM golang:1.18-alpine
ENV TZ /usr/share/zoneinfo/Asia/Tokyo

WORKDIR /app/client

COPY . .
RUN go install github.com/hajimehoshi/wasmserve@latest

CMD ["wasmserve"]