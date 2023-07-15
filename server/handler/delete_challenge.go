package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
)

func DeleteChallenge(c echo.Context) error {

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userid := claims["id"].(float64)

	var userdata db.User
	if err := db.DB.Where("id = ?", userid).First(&userdata).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, echo.Map{
				"message": "User Not Found",
			})
		} else {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}
	}else{
		if userdata.IsAdmin{
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
		}else{
			return c.JSON(http.StatusNotFound,"admin only")
		}
	}
}