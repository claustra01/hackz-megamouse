package db

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func CheckAdmin(c echo.Context, id float64) error {

	var user User
	if err := DB.Where("id = ?", id).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// return 404
			return c.JSON(http.StatusNotFound, echo.Map{
				"message": "User Not Found",
			})
		} else {
			// return 500
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}
	}

	if !user.IsAdmin {
		// return 403
		return c.JSON(http.StatusNotFound, echo.Map{
			"message": "Permission Denied",
		})
	} else {
		return nil
	}
}
