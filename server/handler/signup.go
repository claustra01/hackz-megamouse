package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/claustra01/hackz-megamouse/server/util"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func SignUP(c echo.Context) error {

	type Body struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	type Message struct {
		Message string `json:"message"`
	}

	// parse json
	obj := new(Body)
	if err := c.Bind(obj); err != nil {
		// return 400
		res := Message{
			Message: "Json Format Error: " + err.Error(),
		}
		return c.JSON(http.StatusBadRequest, res)
	}

	// check field
	if util.HasEmptyField(obj, "Username", "Email", "Password") {
		// return 400
		res := Message{
			Message: "Missing Required Field",
		}
		return c.JSON(http.StatusBadRequest, res)
	}

	var user db.User
	if err := db.DB.Where("email = ?", obj.Email).First(&user).Error; err != nil {

		if err == gorm.ErrRecordNotFound {
			// create new user
			new := db.User{
				Username: obj.Username,
				Email:    obj.Email,
				Password: obj.Password,
			}
			db.DB.Create(&new)
			res := Message{
				Message: "User Created",
			}
			return c.JSON(http.StatusCreated, res)

		} else {
			// return 500
			res := Message{
				Message: "Database Error: " + err.Error(),
			}
			return c.JSON(http.StatusInternalServerError, res)
		}

	} else {
		// return 409
		res := Message{
			Message: "Email Conflict",
		}
		return c.JSON(http.StatusConflict, res)
	}
}
