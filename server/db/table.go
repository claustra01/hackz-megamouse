package db

import "time"

type User struct {
	ID        uint   `gorm:"primaryKey"`
	Username  string `gorm:"not null"`
	Profile   string
	Email     string    `gorm:"not null"`
	Password  string    `gorm:"not null"`
	IsAdmin   bool      `gorm:"default:false"`
	CreatedAt time.Time `gorm:"default:current_timestamp"`
	UpdatedAt time.Time `gorm:"default:current_timestamp"`
}
