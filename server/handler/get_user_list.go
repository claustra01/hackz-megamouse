package handler

import (
	"net/http"
	"time"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type OmmitedUser struct {
	Id        uint      `json:"id"`
	Username  string    `json:"username"`
	Profile   string    `json:"profile"`
	Score     uint      `json:"score"`
	IsAdmin   bool      `json:"is_admin"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func ommit(users []db.User) []OmmitedUser {
	var list []OmmitedUser
	for _, v := range users {
		u := OmmitedUser{
			Id:        v.Id,
			Username:  v.Username,
			Profile:   v.Profile,
			Score:     v.Score,
			IsAdmin:   v.IsAdmin,
			CreatedAt: v.CreatedAt,
			UpdatedAt: v.UpdatedAt,
		}
		list = append(list, u)
	}
	return list
}

func GetUserList(c echo.Context) error {

	var users []db.User
	if err := db.DB.Order("score DESC").Find(&users).Error; err != nil {

		if err == gorm.ErrRecordNotFound {
			// return 404
			return c.JSON(http.StatusNotFound, echo.Map{
				"message": "User Not Found",
			})

		} else {
			// return 500
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}

	} else {
		// return 200
		list := ommit(users)
		return c.JSON(http.StatusOK, list)
	}
}
