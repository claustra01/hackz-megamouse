package handler

import (
	"net/http"
	"time"

	"github.com/claustra01/hackz-megamouse/server/db"
	// "github.com/claustra01/hackz-megamouse/server/util"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// Signup: ユーザー情報登録
// Login: トークン生成
// Auth: user情報取得

// 新規ユーザー登録処理
// func Signup(c echo.Context) error {
// 	// ユーザー名とemailとパスワードが入力されているか
// 	// 既に同じユーザーが登録されていないか
// 	// 大丈夫ならユーザー情報をdbに登録
// 	// パスワードだけ暗号化して登録
// }

// ログイン処理＆トークン生成
func Login(c echo.Context) error {
	type Body struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	type Message struct {
		Message string `json:"message"`
	}
	// parse
	obj := new(Body)
	if err := c.Bind(obj); err != nil {
		res := Message{
			Message: err.Error(),
		}
		return c.JSON(http.StatusBadRequest, res)
	}

	// if util.HasEmptyField(obj, "Username", "Password") {
	// 	res := Message{
	// 		Message: "Missing Required Field;;",
	// 	}
	// 	return c.JSON(http.StatusBadRequest, res)
	// }

	// usernameが存在するか
	var user db.User
	if err := db.DB.Where("username = ?", obj.Username).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			res := Message{
				Message: "User Not Found",
			}
			return c.JSON(http.StatusBadRequest, res)
		} else {
			res := Message{
				Message: "Database Error: " + err.Error(),
			}
			return c.JSON(http.StatusInternalServerError, res)
		}
	} else {
		// パスワードあってるか 
		if user.Password == obj.Password {
			// ペイロード作成
			claims := jwt.MapClaims{
				"username": obj.Username,
				"password": obj.Password,
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
			res := Message{
				Message: "password is incorrect",
			}
			return c.JSON(http.StatusBadRequest,res)
		}
	}
}


// ユーザ情報取得
func Auth(c echo.Context) error {

	type Body struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	res := Body{
		Username: claims["username"].(string),
		Password: claims["password"].(string),
	}
	return c.JSON(http.StatusOK, res)
}