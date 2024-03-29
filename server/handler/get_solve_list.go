package handler

import (
	"net/http"
	"time"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
)

type SolveRes struct {
	UserId      uint      `json:"user_id"`
	ChallengeId uint      `json:"challenge_id"`
	Category    string    `json:"category"`
	Value       int       `json:"value"`
	CreatedAt   time.Time `json:"created_at"`
}

func ommit_sv(solves []db.Solves) []SolveRes {
	var list []SolveRes
	for _, v := range solves {
		u := SolveRes{
			UserId:      v.UserId,
			ChallengeId: v.ChallengeId,
			Category:    v.Category,
			Value:       v.Value,
			CreatedAt:   v.CreatedAt,
		}
		list = append(list, u)
	}
	return list
}

func GetSolveList(c echo.Context) error {
	id := c.Param("id")
	var solves []db.Solves
	if err := db.DB.Where("user_id = ?", id).Order("created_at DESC").Find(&solves).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": "Failed to fetch solves",
		})
	} else {
		res := ommit_sv(solves)
		return c.JSON(http.StatusOK, res)
	}
}
