FROM golang:1.18-alpine
ENV TZ /usr/share/zoneinfo/Asia/Tokyo

WORKDIR /app/server

COPY . .
EXPOSE 8080

CMD ["go", "run", "main.go"]