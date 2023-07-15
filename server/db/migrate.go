package db

import "log"

func Migrate() {

	DB.Exec("DROP TABLE IF EXISTS users")
	DB.Exec("DROP TABLE IF EXISTS challenges")
	DB.Exec("DROP TABLE IF EXISTS submissions")
	DB.Exec("DROP TABLE IF EXISTS solves")

	DB.AutoMigrate(&User{})
	DB.AutoMigrate(&Challenge{})
	DB.AutoMigrate(&Submission{})
	DB.AutoMigrate(&Solves{})

	log.Print("[INFO] DB Migrated!")
}
