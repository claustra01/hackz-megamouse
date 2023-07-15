package components

import (
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
)

type CTabTitle struct {
	vecty.Core
}

func (c *CTabTitle) Render() vecty.ComponentOrHTML {
	vecty.AddStylesheet("/assets/css/header.css")
	return elem.Anchor(
		vecty.Markup(
			vecty.Class("tab-title"),
			vecty.Attribute("href", "/"),
		),
		elem.Div(
			vecty.Markup(
				vecty.Class("tab-title-text"),
			),
			vecty.Text("Megamouse CTF"),
		),
	)
}
