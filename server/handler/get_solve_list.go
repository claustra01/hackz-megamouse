package handler

import (
	"time"
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
	"github.com/dgrijalva/jwt-go"
)

type SolveRes struct {
	UserId uint `json:"user_id"`
	ChallengeId uint `json:"challenge_id"`
	Category string `json:"category"`
	Value int `json:"value"`
	CreatedAt time.Time `json:"created_at"`
}

func ommit_sv(solves []db.Solves) []SolveRes {
	var list []SolveRes
	for _, v := range solves {
		u := SolveRes{
			UserId: v.UserId,
			ChallengeId: v.ChallengeId,
			Category: v.Category,
			Value: v.Value,
			CreatedAt: v.CreatedAt,
		}
		list = append(list, u)
	}
	return list
}
func GetSolveList(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userid := claims["id"].(float64)
	var solves []db.Solves
		if err := db.DB.Where("user_id = ?", userid).Find(&solves).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Failed to fetch submissions",
			})
		}else{
			res := ommit_sv(solves)
			return c.JSON(http.StatusOK, res)
		}
}