package handler

import (
	"net/http"
	"time"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/claustra01/hackz-megamouse/server/util"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Login(c echo.Context) error {
	type Body struct {
		Username string `json:"username"`
		Email string `json:"email"`
		Password string `json:"password"`
	}
	// parse
	obj := new(Body)
	if err := c.Bind(obj); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "Json Format Error: " + err.Error(),
		})
	}

	if util.HasEmptyField(obj, "Username", "Email", "Password") {
		// return 400
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "Missing Required Field",
		})
	}
	// emailが存在するか
	var user db.User
	if err := db.DB.Where("email = ?", obj.Email).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"message": "User Not Found",
			})
		} else {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}
	} else {
		// パスワードあってるか 
		if (user.Username == obj.Username && user.Password == obj.Password) {
			// ペイロード作成
			claims := jwt.MapClaims{
				"id": user.Id,
				"exp":     time.Now().Add(time.Hour * 24).Unix(),
			}
		
			// トークン生成
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		
			// トークンに署名を付与
			tokenString, err := token.SignedString([]byte("SECRET_KEY"))
			if err != nil {
				return err
			}
		
			return c.JSON(http.StatusOK, echo.Map{
				"token": tokenString,
			})
		} else {
			return c.JSON(http.StatusBadRequest,echo.Map{
				"message": "username or password is incorrect",
			})
		}
	}
}
