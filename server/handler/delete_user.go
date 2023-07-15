package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func DeleteUser(c echo.Context) error {

	u := c.Get("user").(*jwt.Token)
	claims := u.Claims.(jwt.MapClaims)
	id := claims["id"].(float64)

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

	} else if user.IsAdmin == true {
		// return 403
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": "cannot delete admin account",
		})

	} else {
		// cleanup submissions and solves
		if err := db.DB.Where("user_id = ?", id).Delete(&db.Submission{}).Error; err != nil {
			// return 500
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}
		if err := db.DB.Where("user_id = ?", id).Delete(&db.Solves{}).Error; err != nil {
			// return 500
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}

		// delete user, return 200
		db.DB.Delete(&db.User{}, id)
		return c.JSON(http.StatusOK, echo.Map{
			"message": "Deletion Successful",
		})
	}
}
