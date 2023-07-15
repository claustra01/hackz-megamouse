package handler

import (
	"net/http"
	"time"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
)

type OmmitedChallenge struct {
	Id             uint      `json:"id"`
	Title          string    `json:"title"`
	Category       string    `json:"category"`
	Description    string    `json:"description"`
	FilePath       string    `json:"filepath"`
	ConnectionInfo string    `json:"connection_info"`
	Value          int       `json:"value"`
	IsVisible      bool      `json:"is_visible"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

func ommit_c(challenges []db.Challenge) []OmmitedChallenge {
	var list []OmmitedChallenge
	for _, v := range challenges {
		u := OmmitedChallenge{
			Id:             v.Id,
			Title:          v.Title,
			Category:       v.Category,
			Description:    v.Description,
			FilePath:       v.FilePath,
			ConnectionInfo: v.ConnectionInfo,
			Value:          v.Value,
			IsVisible:      v.IsVisible,
			CreatedAt:      v.CreatedAt,
			UpdatedAt:      v.UpdatedAt,
		}
		list = append(list, u)
	}
	return list
}

func GetChallengeList(c echo.Context) error {

	var categories []db.Category
	var challenges []db.Challenge
	if err := db.DB.Find(&categories).Error; err != nil {
		// return 500
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": "Database Error: " + err.Error(),
		})

	} else {
		// get challenges in each category, return 200
		var chal []db.Challenge
		for _, v := range categories {
			if err := db.DB.Where("category = ?", v.Name).Order("value ASC").Find(&chal).Error; err != nil {
				// return 500
				return c.JSON(http.StatusInternalServerError, echo.Map{
					"message": "Database Error: " + err.Error(),
				})
			}
			challenges = append(challenges, chal...)
		}
		list := ommit_c(challenges)
		return c.JSON(http.StatusOK, list)
	}
}
