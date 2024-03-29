package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func GetUser(c echo.Context) error {
	id := c.Param("id")
	var user db.User
	if err := db.DB.Where("id = ?", id).First(&user).Error; err != nil {

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

	} else {
		// return 200
		return c.JSON(http.StatusOK, echo.Map{
			"id":         user.Id,
			"username":   user.Username,
			"profile":    user.Profile,
			"email":      user.Email,
			"score":      user.Score,
			"is_admin":   user.IsAdmin,
			"created_at": user.CreatedAt,
			"updated_at": user.UpdatedAt,
		})
	}
}
