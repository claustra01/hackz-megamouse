package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/claustra01/hackz-megamouse/server/util"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

func UpdateChallenge(c echo.Context) error {

	type Body struct {
		Title          string `json:"title"`
		Category       string `json:"category"`
		Description    string `json:"description"`     // Nullable
		FilePath       string `json:"file_path"`       // Nullable
		ConnectionInfo string `json:"connection_info"` // Nullable
		Flag           string `json:"flag"`            // Nullable
		Value          int    `json:"value"`           // Nullable
		IsVisible      bool   `json:"id_visible"`      // Nullable
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

	id := c.Param("id")
	var challenge db.Challenge
	if err := db.DB.Where("id = ?", id).First(&challenge).Error; err != nil {
		// return 500
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": "Database Error: " + err.Error(),
		})

	} else {

		// parse json
		obj := new(Body)
		if err := c.Bind(obj); err != nil {
			// return 400
			return c.JSON(http.StatusBadRequest, echo.Map{
				"message": "Json Format Error: " + err.Error(),
			})
		}

		// check field
		if util.HasEmptyField(obj, "Username", "Title", "Category") {
			// return 400
			return c.JSON(http.StatusBadRequest, echo.Map{
				"message": "Missing Required Field",
			})
		}

		// update challenge, return 200
		challenge.Title = obj.Title
		challenge.Category = obj.Category
		challenge.Description = obj.Description
		challenge.FilePath = obj.FilePath
		challenge.ConnectionInfo = obj.ConnectionInfo
		challenge.Value = obj.Value
		challenge.IsVisible = obj.IsVisible
		db.DB.Save(&challenge)
		return c.JSON(http.StatusOK, echo.Map{
			"id":              challenge.Id,
			"title":           challenge.Title,
			"category":        challenge.Category,
			"description":     challenge.Description,
			"file_path":       challenge.FilePath,
			"connection_info": challenge.ConnectionInfo,
			"value":           challenge.Value,
			"is_visible":      challenge.IsVisible,
			"created_at":      challenge.CreatedAt,
			"updated_at":      challenge.UpdatedAt,
		})
	}
}
