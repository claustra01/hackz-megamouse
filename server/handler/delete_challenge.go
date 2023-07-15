package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func DeleteChallenge(c echo.Context) error {

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userid := claims["id"].(float64)

	res, msg := db.CheckAdmin(userid)
	if res != 0 {
		return c.JSON(res, echo.Map{
			"message": msg,
		})
	}

	id := c.Param("id")
	var challenge db.Challenge
	if err := db.DB.Where("id = ?", id).First(&challenge).Error; err != nil {

		if err == gorm.ErrRecordNotFound {
			// return 404
			return c.JSON(http.StatusNotFound, echo.Map{
				"message": "Challenge Not Found",
			})

		} else {
			// return 500
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}

	} else {
		// delete user, return 200
		db.DB.Delete(&db.Challenge{}, id)
		return c.JSON(http.StatusOK, echo.Map{
			"message": "Deletion Successful",
		})
	}
}
