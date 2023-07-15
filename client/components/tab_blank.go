package components

import (
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
)

type CTabBlank struct {
	vecty.Core
	Props CTabProps
}

func (c *CTabBlank) Render() vecty.ComponentOrHTML {
	vecty.AddStylesheet("/assets/css/header.css")
	return elem.Div(
		vecty.Markup(
			vecty.Class("tab-blank"),
		),
	)
}
