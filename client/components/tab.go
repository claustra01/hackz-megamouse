package components

import (
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
	"github.com/hexops/vecty/prop"
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
	return elem.Div(
		vecty.Markup(
			vecty.Class("tab"),
		),
		elem.Anchor(
			vecty.Markup(
				prop.Href(c.Props.Path),
			),
			vecty.Text(c.Props.Text),
		),
	)
}
