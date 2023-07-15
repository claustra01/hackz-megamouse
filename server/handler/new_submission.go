package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/claustra01/hackz-megamouse/server/util"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)
func NewSubmission(c echo.Context) error {
	type Submission struct {
		UserId uint `json:"userid"`
		ChallengeId uint `json:"challengeid"`
		Body string `json:"body"`
	}

	obj := new(Submission)
	if err := c.Bind(obj); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "Json Format Error: " + err.Error(),
		})
	}

	if util.HasEmptyField(obj, "UserId", "ChallengeId", "Body") {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "Missing Required Field",
		})
	}


	// 問題をみて答えが合っていたらisCollectをtrueにしてsubmissionとsolveをcreate
	// あっていなければisCollectをfalseにしてsubmissionをcreate
	var challenge db.Challenge
	if err := db.DB.Where("id = ?", obj.ChallengeId).First(&challenge).Error; err != nil {
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
		if challenge.Flag == obj.Body {
		 // 処理
			submission := db.Submission{
			UserId: obj.UserId,
			ChallengeId: obj.ChallengeId,
			Body: obj.Body,
			IsCollect: true,
			}
			db.DB.Create(&submission)

			solve := db.Solves{
			UserId: obj.UserId,
			ChallengeId: obj.ChallengeId,
			Category: challenge.Category,
			Value: challenge.Value,
			}
			db.DB.Create(&solve)

			return c.JSON(http.StatusOK, "solved")
		}else{
			// 処理
			submission := db.Submission{
				UserId: obj.UserId,
				ChallengeId: obj.ChallengeId,
				Body: obj.Body,
				IsCollect: false,
			}
			db.DB.Create(&submission)
			return c.JSON(http.StatusOK, "incollect")
		}
	}
}