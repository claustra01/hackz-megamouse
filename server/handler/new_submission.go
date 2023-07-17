package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/claustra01/hackz-megamouse/server/util"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func NewSubmission(c echo.Context) error {
	type Body struct {
		ChallengeId uint   `json:"challenge_id"`
		Body        string `json:"body"`
	}

	obj := new(Body)
	if err := c.Bind(obj); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "Json Format Error: " + err.Error(),
		})
	}

	if util.HasEmptyField(obj, "Body") {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "Missing Required Field",
		})
	}

	// ユーザーのIDを取得
	u := c.Get("user").(*jwt.Token)
	claims := u.Claims.(jwt.MapClaims)
	userid := claims["id"].(float64)

	// ユーザー情報をデータベースから取得
	var user db.User
	if err := db.DB.Where("id = ?", uint(userid)).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, echo.Map{
				"message": "User Not Found",
			})
		} else {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}
	}

	// 指定されたChallenge IDの問題をデータベースから取得
	var challenge db.Challenge
	if err := db.DB.Where("id = ?", obj.ChallengeId).First(&challenge).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, echo.Map{
				"message": "Challenge Not Found",
			})
		} else {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}
	}

	// ユーザーがすでに解いているかどうかを確認
	var solve db.Solves
	err := db.DB.Where("user_id = ? AND challenge_id = ?", user.Id, challenge.Id).First(&solve).Error
	if err == gorm.ErrRecordNotFound {
		// solveが存在しない場合は、新しいsubmissionとsolveを作成し、ユーザーのスコアを更新
		submission := db.Submission{
			UserId:      user.Id,
			ChallengeId: challenge.Id,
			Body:        obj.Body,
			IsCollect:   challenge.Flag == obj.Body,
		}
		db.DB.Create(&submission)

		if challenge.Flag == obj.Body {
			// 解答が正解の場合は、新しいsolveを作成してスコアを加算
			solve := db.Solves{
				UserId:      user.Id,
				ChallengeId: challenge.Id,
				Category:    challenge.Category,
				Value:       challenge.Value,
			}
			db.DB.Create(&solve)

			// ユーザーのスコアを更新
			user.Score += uint(challenge.Value)
			db.DB.Save(&user)
		}

		res := SubmissionRes{
			Id:          submission.Id,
			UserId:      submission.UserId,
			ChallengeId: submission.ChallengeId,
			Body:        submission.Body,
			IsCollect:   submission.IsCollect,
			CreatedAt:   submission.CreatedAt,
		}
		return c.JSON(http.StatusCreated, res)
	} else if err != nil {
		// エラーがあればエラーレスポンスを返す
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": "Database Error: " + err.Error(),
		})
	}

	// solveが存在する場合は、新しいsubmissionのみを作成
	submission := db.Submission{
		UserId:      user.Id,
		ChallengeId: challenge.Id,
		Body:        obj.Body,
		IsCollect:   challenge.Flag == obj.Body,
	}
	db.DB.Create(&submission)

	res := SubmissionRes{
		Id:          submission.Id,
		UserId:      submission.UserId,
		ChallengeId: submission.ChallengeId,
		Body:        submission.Body,
		IsCollect:   submission.IsCollect,
		CreatedAt:   submission.CreatedAt,
	}
	return c.JSON(http.StatusCreated, res)
}
