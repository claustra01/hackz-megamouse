package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
)

func UpdateChallenge(c echo.Context) error {
	var challenge db.Challenge
	id := c.Param("id")
	if err := db.DB.Where("id = ?", id).First(&challenge).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Challenge not found")
	}else{
		// 更新処理
		if err := c.Bind(&challenge); err != nil {
			return c.JSON(http.StatusBadRequest, "Failed to parse request body")
		}
		if err := db.DB.Save(&challenge).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, "Failed to update challenge")
		}
		return c.JSON(http.StatusOK, challenge)
	}
}