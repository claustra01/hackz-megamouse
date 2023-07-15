package components

import (
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
)

type CTitleButton struct {
	vecty.Core
	Props CTitleButtonProps
}

type CTitleButtonProps struct {
	Text string
}

func (c *CTitleButton) Render() vecty.ComponentOrHTML {
	vecty.AddStylesheet("/assets/css/index.css")
	return elem.Button(
		vecty.Markup(
			vecty.Class("title-button"),
		),
		vecty.Text(c.Props.Text),
	)
}
