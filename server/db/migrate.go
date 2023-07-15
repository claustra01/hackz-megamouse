package db

import (
	"log"
	"os"
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
	admin := User{
		Username: "admin",
		Email:    "admin@megamouse.ctf",
		Password: os.Getenv("ADMIN_PASSWORD"),
		IsAdmin:  true,
	}
	DB.Create(&admin)

	log.Print("[INFO] DB Migrated!")
}
