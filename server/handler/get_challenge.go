package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
)
// e.GET("/challenges/:id", getChallenge)(main.go)
func GetChallenge(c echo.Context) error {

	var challenge db.Challenge
	id := c.Param("id")
	if err := db.DB.Where("id = ?", id).First(&challenge).Error; err != nil {
		return c.String(http.StatusNotFound, "Challenge not found")
	}else{
		return c.JSON(http.StatusOK, challenge)
	}
}