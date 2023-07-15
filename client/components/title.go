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
	return elem.Div(
		vecty.Markup(
			vecty.Class("title"),
		),
		vecty.Text("Title"),
	)
}
