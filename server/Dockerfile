FROM golang:1.18-alpine AS build

WORKDIR /build

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o binary

################################
FROM alpine
ENV TZ /usr/share/zoneinfo/Asia/Tokyo

ENV DB_CONNECT_STRINGS ${DB_CONNECT_STRINGS}

WORKDIR /opt/server
COPY --from=build /build/binary .

EXPOSE 8081
CMD ["./binary"]