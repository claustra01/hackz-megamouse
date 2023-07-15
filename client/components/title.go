package components

import (
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
)

type CTitle struct {
	vecty.Core
}

func (c *CTitle) Render() vecty.ComponentOrHTML {
	vecty.AddStylesheet("/assets/css/header.css")
	return elem.Anchor(
		vecty.Markup(
			vecty.Class("title"),
			vecty.Attribute("href", "/"),
		),
		elem.Div(
			vecty.Markup(
				vecty.Class("title-text"),
			),
			vecty.Text("Megamouse CTF"),
		),
	)
}
