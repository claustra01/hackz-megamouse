package components

import (
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
)

type CTab struct {
	vecty.Core
	Props CTabProps
}

type CTabProps struct {
	Text string
	Path string
}

func (c *CTab) Render() vecty.ComponentOrHTML {
	vecty.AddStylesheet("/assets/css/header.css")
	return elem.Anchor(
		vecty.Markup(
			vecty.Class("tab"),
			vecty.Attribute("href", c.Props.Path),
		),
		elem.Div(
			vecty.Markup(
				vecty.Class("tab-text"),
			),
			vecty.Text(c.Props.Text),
		),
	)
}
