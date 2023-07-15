package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func NewChallenge(c echo.Context) error {
	type Challenge struct {
		Title          string `json:"title"`
		Category       string `json:"category"`
		Description    string `json:"description"`
		FilePath       string `json:"filepath"`
		ConnectionInfo string `json:"connectioninfo"`
		Flag           string `json:"flag"`
		Value          int    `json:"value"`
		IsVisible      bool   `json:"is_visible"`
	}

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userid := claims["id"].(float64)

	res, msg := db.CheckAdmin(userid)
	if res != 0 {
		return c.JSON(res, echo.Map{
			"message": msg,
		})
	}

	obj := new(Challenge)
	if err := c.Bind(obj); err != nil {
		// return 400
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "Json Format Error: " + err.Error(),
		})
	}

	var category db.Category
	if err := db.DB.Where("name = ?", obj.Category).First(&category).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// create new category
			db.DB.Create(&db.Category{
				Name: obj.Category,
			})
		} else {
			// return 500
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}
	}

	// create challenge, return 201
	new := db.Challenge{
		Title:          obj.Title,
		Category:       obj.Category,
		Description:    obj.Description,
		FilePath:       obj.FilePath,
		ConnectionInfo: obj.ConnectionInfo,
		Flag:           obj.Flag,
		Value:          obj.Value,
		IsVisible:      obj.IsVisible,
	}
	db.DB.Create(&new)
	return c.JSON(http.StatusCreated, echo.Map{
		"id":              new.Id,
		"title":           new.Title,
		"category":        new.Category,
		"description":     new.Description,
		"filepath":        new.FilePath,
		"connection_info": new.ConnectionInfo,
		"value":           new.Value,
		"is_visible":      new.IsVisible,
		"created_at":      new.CreatedAt,
		"updated_at":      new.UpdatedAt,
	})

}
