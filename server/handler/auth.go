package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)



func Auth(c echo.Context) error {

	type Body struct {
		Id string `json:"id"`
	}
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	data := claims["id"].(float64)
	
	// idをつかってdbからデータ取得
	var authorizedUser db.User
	if err := db.DB.Where("id = ?", data).First(&authorizedUser).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": "Database Error: " + err.Error(),
		})
	} else {
		return c.JSON(http.StatusOK, echo.Map{
			"id": authorizedUser.Id,
			"username": authorizedUser.Username,
			"profile": authorizedUser.Profile,
			"email": authorizedUser.Email,
			"password": authorizedUser.Password,
			"isadmin": authorizedUser.IsAdmin,
			"createdat": authorizedUser.CreatedAt,
			"updateat": authorizedUser.UpdatedAt,
		})
	}
}