package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/claustra01/hackz-megamouse/server/util"
	"github.com/labstack/echo/v4"
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
)
func NewSubmission(c echo.Context) error {
	type Body struct {
		ChallengeId uint `json:"challenge_id"`
		Body string `json:"body"`
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


	// 問題をみて答えが合っていたらisCollectをtrueにしてsubmissionとsolveをcreate,scoreを加算
	// あっていなければisCollectをfalseにしてsubmissionをcreate
	var user db.User
	var challenge db.Challenge
	u := c.Get("user").(*jwt.Token)
	claims := u.Claims.(jwt.MapClaims)
	userid := claims["id"].(float64)

	if err := db.DB.Where("id = ?", userid).First(&user).Error; err != nil {
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
		}else{
			if challenge.Flag == obj.Body {
			 // db登録処理
				submission := db.Submission{
				UserId: user.Id,
				ChallengeId: challenge.Id,
				Body: obj.Body,
				IsCollect: true,
				}
				db.DB.Create(&submission)
	
				solve := db.Solves{
				UserId: user.Id,
				ChallengeId: challenge.Id,
				Category: challenge.Category,
				Value: challenge.Value,
				}
				db.DB.Create(&solve)
				// score加算
				user.Score += uint(challenge.Value)
				db.DB.Save(&user)
				res := SubmissionRes{
					Id: submission.Id,
					UserId: submission.UserId,
					ChallengeId: submission.ChallengeId,
					Body: submission.Body,
					IsCollect: submission.IsCollect,
					CreatedAt: submission.CreatedAt,
				}
				return c.JSON(http.StatusCreated, res)


			}else{
				// 処理
				submission := db.Submission{
					UserId: user.Id,
					ChallengeId: challenge.Id,
					Body: obj.Body,
					IsCollect: false,
				}
				db.DB.Create(&submission)
				res := SubmissionRes{
					Id: submission.Id,
					UserId: submission.UserId,
					ChallengeId: submission.ChallengeId,
					Body: submission.Body,
					IsCollect: submission.IsCollect,
					CreatedAt: submission.CreatedAt,
				}
				return c.JSON(http.StatusCreated, res)
			}
		}
	}
}