FROM golang:1.18-alpine AS build

WORKDIR /build

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o binary

################################
FROM alpine
ENV TZ /usr/share/zoneinfo/Asia/Tokyo

# pass secrets from repository to container
ARG DB_CONNECT_STRINGS
ENV DB_CONNECT_STRINGS ${DB_CONNECT_STRINGS}
ARG JWT_SECRET_KEY
ENV JWT_SECRET_KEY ${JWT_SECRET_KEY}
ARG ADMIN_PASSWORD
ENV ADMIN_PASSWORD ${ADMIN_PASSWORD}

WORKDIR /opt/server
COPY --from=build /build/binary .

EXPOSE 8081
CMD ["./binary"]