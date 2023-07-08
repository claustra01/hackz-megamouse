package main

import (
	"log"

	"github.com/claustra01/hackz_megamouse/server/handler"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func main() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("[ERROR] ", err)
	}

	e := echo.New()

	e.GET("/sample/", handler.Sample)

	e.Logger.Fatal(e.Start(":8081"))
}
