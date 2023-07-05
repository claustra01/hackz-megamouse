FROM golang:1.18-alpine
ENV TZ /usr/share/zoneinfo/Asia/Tokyo

WORKDIR /app/client

COPY . .
EXPOSE 3000

CMD ["go", "run", "main.go"]