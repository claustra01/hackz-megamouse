package handler

import (
	"net/http"
	"time"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
)

type OmmitedChallenge struct {
	Id        uint      `json:"id"`
	Title  string    `json:"title"`
	Category   string    `json:"category"`
	Description     string    `json:"description"`
	FilePath     string      `json:"filepath"`
	ConnectionInfo   string      `json:"connection_info"`
	Value   int      `json:"value"`
	IsVisible   bool      `json:"is_visible"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}


func ommit_c(challenges []db.Challenge) []OmmitedChallenge {
	var list []OmmitedChallenge
	for _, v := range challenges {
		u := OmmitedChallenge{
			Id:        v.Id,
			Title:  v.Title,
			Category:   v.Category,
			Description:     v.Description,
			FilePath:     v.FilePath,
			ConnectionInfo:   v.ConnectionInfo,
			Value: v.Value,
			IsVisible: v.IsVisible,
			CreatedAt: v.CreatedAt,
			UpdatedAt: v.UpdatedAt,
		}
		list = append(list, u)
	}
	return list
}

func GetChallengeList(c echo.Context) error {
	var challenges []db.Challenge
		if err := db.DB.Find(&challenges).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Failed to fetch challenges",
			})
		}else{
			list := ommit_c(challenges)
			return c.JSON(http.StatusOK, list)
		}
}