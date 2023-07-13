package db

import "log"

func Migrate() {
	DB.Exec("DROP TABLE IF EXISTS users")
	DB.AutoMigrate(&User{})
	log.Print("[INFO] DB Migrated!")
}
