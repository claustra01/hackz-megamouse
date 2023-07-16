package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)
func GetSubmission(c echo.Context) error {

	var submission db.Submission
	id := c.Param("id")
	if err := db.DB.Where("id = ?", id).First(&submission).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, echo.Map{
				"message": "Submission not found",
			})

		} else {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}
	}else{
		res := SubmissionRes{
			Id: submission.Id,
			UserId: submission.UserId,
			ChallengeId: submission.ChallengeId,
			Body: submission.Body,
			IsCollect: submission.IsCollect,
			CreatedAt: submission.CreatedAt,
		}
		return c.JSON(http.StatusOK, res)
	}
}