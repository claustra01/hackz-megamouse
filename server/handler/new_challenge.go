package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/claustra01/hackz-megamouse/server/util"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func NewChallenge(c echo.Context) error {
	type Challenge struct{
		Title string `json:"title"`
		Category string `json:"category"`
		Description string `json:"description"`
		FilePath string `json:"filepath"`
		ConnectionInfo string `json:"connectioninfo"`
		Flag string `json:"flag"`
		Value int `json:"value"`
	}

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
			obj := new(Challenge)
			if err := c.Bind(obj); err != nil {
				return c.JSON(http.StatusBadRequest, echo.Map{
					"message": "Json Format Error: " + err.Error(),
				})
			}
		
			if util.HasEmptyField(obj, "Title", "Category","Flag","Value") {
				// return 400
				return c.JSON(http.StatusBadRequest, echo.Map{
					"message": "Missing Required Field",
				})
			}
			
			new := db.Challenge{
				Title: obj.Title,
				Category: obj.Category,
				Description: obj.Description,
				FilePath: obj.FilePath,
				ConnectionInfo: obj.ConnectionInfo,
				Flag: obj.Flag,
				Value: obj.Value,
			}
		
			db.DB.Create(&new)
			return c.JSON(http.StatusOK, echo.Map{
				"message": "Challenge created successfully",
			})
		}else{
			return c.JSON(http.StatusNotFound, echo.Map{
				"message": "admin only",
			})
		}
	}
}