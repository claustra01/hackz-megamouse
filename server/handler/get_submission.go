package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
)
func GetSubmission(c echo.Context) error {

	var submission db.Submission
	id := c.Param("id")
	if err := db.DB.Where("id = ?", id).First(&submission).Error; err != nil {
		return c.String(http.StatusNotFound, "Challenge not found")
	}else{
		return c.JSON(http.StatusOK, submission)
	}
}