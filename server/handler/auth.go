package handler

import (
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
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
	username := c.FormValue("username")
	password := c.FormValue("password")

	// usernameが存在するか, 存在するならpasswordはあっているか, の確認
	if username != "hoge" || password != "hoge" {
		return echo.ErrUnauthorized
	}

	// ペイロードの作成
	claims := jwt.MapClaims{
		"user_id": 00000000,
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
}

// ユーザ情報取得
func Auth(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := int64(claims["user_id"].(float64))
	return c.String(http.StatusOK, fmt.Sprintf("userID: %v", userID))
}