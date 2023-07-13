FROM golang:1.18-alpine AS build

WORKDIR /build

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o binary

################################
FROM alpine
ENV TZ /usr/share/zoneinfo/Asia/Tokyo

ENV DB_CONNECT_STRINGS "postgresql://db_user:db_pass@hackz-megamouse-db-1:5432/db"

WORKDIR /opt/server
COPY --from=build /build/binary .

EXPOSE 8081
CMD ["./binary"]