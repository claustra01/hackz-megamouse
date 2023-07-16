package db

import "time"

type User struct {
	Id        uint   `gorm:"primaryKey"`
	Username  string `gorm:"not null"`
	Profile   string
	Email     string    `gorm:"not null;unique"`
	Password  string    `gorm:"not null"`
	Score     uint      `gorm:"default:0"`
	IsAdmin   bool      `gorm:"default:false"`
	CreatedAt time.Time `gorm:"default:current_timestamp"`
	UpdatedAt time.Time `gorm:"default:current_timestamp"`
}

type Challenge struct {
	Id             uint   `gorm:"primaryKey"`
	Title          string `gorm:"not null"`
	Category       string `gorm:"not null"`
	Description    string
	FilePath       string
	ConnectionInfo string
	Flag           string
	Value          int
	IsVisible      bool      `gorm:"default:false"`
	CreatedAt      time.Time `gorm:"default:current_timestamp"`
	UpdatedAt      time.Time `gorm:"default:current_timestamp"`
}

type Category struct {
	Name      string    `gorm:"primaryKey"`
	CreatedAt time.Time `gorm:"default:current_timestamp"`
}

type Submission struct {
	Id          uint      `gorm:"primaryKey"`
	UserId      uint      `gorm:"not null"`
	ChallengeId uint      `gorm:"not null"`
	Body        string    `gorm:"not null"`
	IsCollect   bool      `gorm:"not null"`
	CreatedAt   time.Time `gorm:"default:current_timestamp"`
}

type Solves struct {
	UserId      uint      `gorm:"primaryKey"`
	ChallengeId uint      `gorm:"primaryKey"`
	Category    string    `gorm:"not null"`
	Value       int    `gorm:"not null"`
	CreatedAt   time.Time `gorm:"default:current_timestamp"`
}
