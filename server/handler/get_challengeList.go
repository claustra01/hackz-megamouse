package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
)

func GetChallengeList(c echo.Context) error {
	var challenges []db.Challenge
		if err := db.DB.Find(&challenges).Error; err != nil {
			return c.String(http.StatusInternalServerError, "Failed to fetch challenges")
		}else{
			return c.JSON(http.StatusOK, challenges)
		}
}