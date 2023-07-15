package handler

import (
	"net/http"
	"time"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/claustra01/hackz-megamouse/server/util"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

func UpdateUser(c echo.Context) error {

	type Body struct {
		Username string `json:"username"`
		Profile  string `json:"Profile"` // Nullable
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	u := c.Get("user").(*jwt.Token)
	claims := u.Claims.(jwt.MapClaims)
	id := claims["id"].(float64)

	var user db.User
	if err := db.DB.Where("id = ?", id).First(&user).Error; err != nil {
		// return 500
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": "Database Error: " + err.Error(),
		})

	} else {
		// parse json
		obj := new(Body)
		if err := c.Bind(obj); err != nil {
			// return 400
			return c.JSON(http.StatusBadRequest, echo.Map{
				"message": "Json Format Error: " + err.Error(),
			})
		}

		// check field
		if util.HasEmptyField(obj, "Username", "Email", "Password", "OldPassword") {
			// return 400
			return c.JSON(http.StatusBadRequest, echo.Map{
				"message": "Missing Required Field",
			})
		}

		var u db.User
		db.DB.Where("id != ?", id).Where("email = ?", obj.Email).Find(&u)
		if u.Id != 0 {
			// return 409
			return c.JSON(http.StatusConflict, echo.Map{
				"message": "Email Conflict",
			})

		} else {
			// update user, return 200
			user.Username = obj.Username
			user.Profile = obj.Profile
			user.Email = obj.Email
			user.Password = obj.Password
			user.UpdatedAt = time.Now()
			return c.JSON(http.StatusOK, echo.Map{
				"id":         user.Id,
				"username":   user.Username,
				"profile":    user.Profile,
				"email":      user.Email,
				"score":      user.Score,
				"is_admin":   user.IsAdmin,
				"created_at": user.CreatedAt,
				"updated_at": user.UpdatedAt,
			})
		}
	}
}
