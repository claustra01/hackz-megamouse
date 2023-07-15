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
				Text: "example",
				Path: "/example",
			},
		},
		&CTab{
			Props: CTabProps{
				Text: "example",
				Path: "/example",
			},
		},
		&CTab{
			Props: CTabProps{
				Text: "example",
				Path: "/example",
			},
		},
		&CTab{
			Props: CTabProps{
				Text: "example",
				Path: "/example",
			},
		},
		&CTab{
			Props: CTabProps{
				Text: "example",
				Path: "/example",
			},
		},
	)
}
