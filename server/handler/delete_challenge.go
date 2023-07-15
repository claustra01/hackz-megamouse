package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
)

func DeleteChallenge(c echo.Context) error {
	var challenge db.Challenge
	id := c.Param("id")
	if err := db.DB.Where("id = ?", id).First(&challenge).Error; err != nil {
		return c.String(http.StatusNotFound, "Challenge not found")
	}else{
		//削除処理
		if err := db.DB.Delete(&db.Challenge{}, id).Error; err != nil {
			return c.String(http.StatusInternalServerError, "Failed to delete challenge")
		}else{
			return c.JSON(http.StatusOK, "Challenge deleted successfully")
		}
	}
}