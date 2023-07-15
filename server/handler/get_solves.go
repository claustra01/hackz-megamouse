package handler

import (
	"net/http"

	"github.com/claustra01/hackz-megamouse/server/db"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)
func GetSolve(c echo.Context) error {

	var solve db.Solves
	id := c.Param("id")
	// Idの使い道わからん
	if err := db.DB.Where("user_id = ?", id).First(&solve).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(http.StatusNotFound, echo.Map{
				"message": "Solves not found",
			})

		} else {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "Database Error: " + err.Error(),
			})
		}
	} else {
		res := SolveRes{
			UserId: solve.UserId,
			ChallengeId: solve.ChallengeId,
			Category: solve.Category,
			Value: solve.Value,
			CreatedAt: solve.CreatedAt,
		}
		return c.JSON(http.StatusOK, res)
	}
}
