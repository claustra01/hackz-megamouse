package main

import (
	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/claustra01/hackz-megamouse/server/handler"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func main() {

	godotenv.Load(".env")
	db.Connect()

	e := echo.New()
	e.GET("/sample", handler.Sample)

	e.Logger.Fatal(e.Start(":8081"))
}
