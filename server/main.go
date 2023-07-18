package main

import (
	"errors"
	"fmt"
	"os"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/claustra01/hackz-megamouse/server/handler"
	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	godotenv.Load(".env")
	e := echo.New()
	db.Connect()

	// echo.middleware JWTConfigの設定
	config := middleware.JWTConfig{
		SigningKey: []byte(os.Getenv("JWT_SECRET_KEY")),
		ParseTokenFunc: func(tokenString string, c echo.Context) (interface{}, error) {
			keyFunc := func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				return []byte(os.Getenv("JWT_SECRET_KEY")), nil
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

	e.POST("/users", handler.NewUser)
	e.GET("/users/:id", handler.GetUser)
	e.GET("/users", handler.GetUserList)

	e.POST("/login", handler.Login)

	// user group
	r := e.Group("/auth")
	r.Use(middleware.JWTWithConfig(config))

	r.GET("", handler.Auth)

	r.PUT("/users", handler.UpdateUser)
	r.DELETE("/users", handler.DeleteUser)
	r.PUT("/users/admin/:id", handler.RoleAdmin)

	r.POST("/challenges", handler.NewChallenge)
	r.GET("/challenges/:id", handler.GetChallenge)
	r.PUT("/challenges/:id", handler.UpdateChallenge)
	r.DELETE("/challenges/:id", handler.DeleteChallenge)
	r.GET("/challenges", handler.GetChallengeList)

	r.POST("/submissions", handler.NewSubmission)
	r.GET("/submissions/:id", handler.GetSubmission)
	r.GET("/submissions", handler.GetSubmissionList)

	r.GET("/solves/users/:id", handler.GetSolveList)

	e.Logger.Fatal(e.Start(":8080"))
}
