FROM golang:1.18-alpine
ENV TZ /usr/share/zoneinfo/Asia/Tokyo

WORKDIR /app/client

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o binary

EXPOSE 3000

CMD ["./binary"]