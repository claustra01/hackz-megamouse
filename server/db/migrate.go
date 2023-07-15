package db

import (
	"log"
	"os"

	"github.com/claustra01/hackz-megamouse/server/util"
)

func Migrate() {

	DB.Exec("DROP TABLE IF EXISTS users")
	DB.Exec("DROP TABLE IF EXISTS challenges")
	DB.Exec("DROP TABLE IF EXISTS submissions")
	DB.Exec("DROP TABLE IF EXISTS solves")

	DB.AutoMigrate(&User{})
	DB.AutoMigrate(&Challenge{})
	DB.AutoMigrate(&Submission{})
	DB.AutoMigrate(&Solves{})

	// create admin user
	hashedPassword, err := util.HashPassword(os.Getenv("ADMIN_PASSWORD"))
	if err != nil {
		log.Fatal("[Error] Migration failed")
	}
	admin := User{
		Username: "admin",
		Email:    "admin@megamouse.ctf",
		Password: hashedPassword,
		IsAdmin:  true,
	}
	DB.Create(&admin)

	log.Print("[INFO] DB Migrated!")
}
