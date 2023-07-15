package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
)

func UpdateChallenge(c echo.Context) error {

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
				return c.JSON(http.StatusNotFound, echo.Map{
					"message": "Challenge not found",
				})
			}else{
				// 更新処理
				if err := c.Bind(&challenge); err != nil {
					return c.JSON(http.StatusBadRequest, echo.Map{
						"message": "Failed to parse request body",
					})
				}
				if err := db.DB.Save(&challenge).Error; err != nil {
					return c.JSON(http.StatusInternalServerError, echo.Map{
						"message": "Failed to update challenge",
					})
				}
				o_challenge := OmmitedChallenge{
					Id: challenge.Id,
					Title: challenge.Title,
					Category: challenge.Category,
					Description: challenge.Description,
					FilePath: challenge.FilePath,
					ConnectionInfo: challenge.ConnectionInfo,
					Value: challenge.Value,
					IsVisible: challenge.IsVisible,
					CreatedAt: challenge.CreatedAt,
					UpdatedAt: challenge.UpdatedAt,
				}
				return c.JSON(http.StatusOK, o_challenge)
			}
		}else{
			return c.JSON(http.StatusForbidden, echo.Map{
				"message": "admin only",
			})
		}
	}
}