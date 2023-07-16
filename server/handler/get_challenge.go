package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// e.GET("/challenges/:id", getChallenge)(main.go)
func GetChallenge(c echo.Context) error {

	var challenge db.Challenge
	id := c.Param("id")
	if err := db.DB.Where("id = ?", id).First(&challenge).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// return 404
			return c.JSON(http.StatusNotFound, echo.Map{
				"message": "Challenge not found",
			})

		} else {
			// return 500
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}

	} else {
		// return 200
		o_challenge := OmmitedChallenge{
			Id:             challenge.Id,
			Title:          challenge.Title,
			Category:       challenge.Category,
			Description:    challenge.Description,
			FilePath:       challenge.FilePath,
			ConnectionInfo: challenge.ConnectionInfo,
			Value:          challenge.Value,
			IsVisible:      challenge.IsVisible,
			CreatedAt:      challenge.CreatedAt,
			UpdatedAt:      challenge.UpdatedAt,
		}
		return c.JSON(http.StatusOK, o_challenge)
	}
}
