package handler

import (
	"time"
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
)

type SubmissionRes struct {
	Id uint `json:"id"`
	UserId uint `json:"user_id"`
	ChallengeId uint `json:"challenge_id"`
	Body string `json:"body"`
	IsCollect bool `json:"is_collect"`
	CreatedAt time.Time `json:"created_at"`
}

func ommit_s(submissions []db.Submission) []SubmissionRes {
	var list []SubmissionRes
	for _, v := range submissions {
		u := SubmissionRes{
			Id: v.Id,
			UserId: v.UserId,
			ChallengeId: v.ChallengeId,
			Body: v.Body,
			IsCollect: v.IsCollect,
			CreatedAt: v.CreatedAt,
		}
		list = append(list, u)
	}
	return list
}
func GetSubmissionList(c echo.Context) error {
	id := c.Param("id")
	var submissions []db.Submission
		if err := db.DB.Where("user_id = ?", id).Find(&submissions).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Failed to fetch submissions",
			})
		}else{
			res := ommit_s(submissions)
			return c.JSON(http.StatusOK, res)
		}
}