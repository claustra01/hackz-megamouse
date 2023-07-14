package main

import (
	"fmt"
	"errors"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/claustra01/hackz-megamouse/server/handler"
	"github.com/joho/godotenv"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	godotenv.Load(".env")
	db.Connect()

	e := echo.New()
	e.POST("/login", handler.Login)
	e.GET("/sample", handler.Sample)

	// user group
	r := e.Group("/user")

	// echo.middleware JWTConfigの設定
	config := middleware.JWTConfig{
		SigningKey: []byte("SECRET_KEY"),
		ParseTokenFunc: func(tokenString string, c echo.Context) (interface{}, error) {
			keyFunc := func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				return []byte("SECRET_KEY"), nil
			}

			token, err := jwt.Parse(tokenString, keyFunc)
			if err != nil {
				return nil, err
			}
			if !token.Valid {
				return nil, errors.New("invalid token")
			}
			return token, nil
		},
	}
	r.Use(middleware.JWTWithConfig(config))
	r.GET("", handler.Auth)

	e.Logger.Fatal(e.Start(":8081"))
}