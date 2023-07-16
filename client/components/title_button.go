package components

import (
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
	"github.com/hexops/vecty/event"
)

type CTitleButton struct {
	vecty.Core
	Props CTitleButtonProps
}

type CTitleButtonProps struct {
	Text  string
	Event func(e *vecty.Event)
}

func (c *CTitleButton) Render() vecty.ComponentOrHTML {
	vecty.AddStylesheet("/assets/css/index.css")
	return elem.Button(
		vecty.Markup(
			vecty.Class("title-button"),
			event.Click(c.Props.Event),
		),
		vecty.Text(c.Props.Text),
	)
}
