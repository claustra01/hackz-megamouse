package components

import (
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
)

type CTitle struct {
	vecty.Core
	Props CTabProps
}

func (c *CTitle) Render() vecty.ComponentOrHTML {
	vecty.AddStylesheet("/assets/css/index.css")
	return elem.Anchor(
		vecty.Markup(
			vecty.Class("title"),
		),
		elem.Div(
			vecty.Text("Megamouse CTF"),
		),
	)
}
