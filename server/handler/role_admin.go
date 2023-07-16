package handler

import (
	"fmt"
	"net/http"
	"time"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func RoleAdmin(c echo.Context) error {

	adminUser := c.Get("user").(*jwt.Token)
	claims := adminUser.Claims.(jwt.MapClaims)
	adminId := claims["id"].(float64)

	res, msg := db.CheckAdmin(adminId)
	if res != 0 {
		return c.JSON(res, echo.Map{
			"message": msg,
		})
	}

	id := c.Param("id")
	if fmt.Sprintf("%v", adminId) == id {
		// return 403
		return c.JSON(http.StatusForbidden, echo.Map{
			"message": "cannot switch own account role",
		})
	}

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
		// change role, return 200
		user.IsAdmin = !user.IsAdmin
		user.UpdatedAt = time.Now()
		db.DB.Save(&user)
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
