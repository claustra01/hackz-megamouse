package components

import (
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
)

type CHeader struct {
	vecty.Core
}

func (c *CHeader) Render() vecty.ComponentOrHTML {
	vecty.AddStylesheet("/assets/css/header.css")
	return elem.Div(
		vecty.Markup(
			vecty.Class("header"),
		),
		&CTitle{},
		&CTab{
			Props: CTabProps{
				Text: "ScoreBoard",
				Path: "/scoreboard",
			},
		},
		&CTab{
			Props: CTabProps{
				Text: "Challenges",
				Path: "/challenges",
			},
		},
		&CTabBlank{},
		&CTab{
			Props: CTabProps{
				Text: "Profile",
				Path: "/profile",
			},
		},
		&CTab{
			Props: CTabProps{
				Text: "Login",
				Path: "/login",
			},
		},
	)
}
