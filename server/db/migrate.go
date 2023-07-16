package db

import (
	"log"
	"os"

	"github.com/claustra01/hackz-megamouse/server/util"
)

func Migrate() {

	DB.Exec("DROP TABLE IF EXISTS users")
	DB.Exec("DROP TABLE IF EXISTS challenges")
	DB.Exec("DROP TABLE IF EXISTS categories")
	DB.Exec("DROP TABLE IF EXISTS submissions")
	DB.Exec("DROP TABLE IF EXISTS solves")

	DB.AutoMigrate(&User{})
	DB.AutoMigrate(&Challenge{})
	DB.AutoMigrate(&Category{})
	DB.AutoMigrate(&Submission{})
	DB.AutoMigrate(&Solves{})

	// create admin user
	hashedPass, _ := util.HashPassword(os.Getenv("ADMIN_PASSWORD"))
	admin := User{
		Username: "admin",
		Email:    "admin@megamouth.ctf",
		Password: hashedPass,
		IsAdmin:  true,
	}
	DB.Create(&admin)

	// create test user
	user := User{
		Username: "user",
		Email:    "user@megamouth.ctf",
		Password: hashedPass,
	}
	DB.Create(&user)

	log.Print("[INFO] DB Migrated!")
}
