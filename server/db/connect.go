package db

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() {
	dsn := os.Getenv("DB_CONNECT_STRINGS")
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("[ERROR] ", err)
	} else {
		log.Print("[INFO] DB Connected!")
	}
	return
}
