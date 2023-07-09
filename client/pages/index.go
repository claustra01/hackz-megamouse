package pages

import (
	"github.com/claustra01/hackz_megamouse/client/components"
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
	"github.com/hexops/vecty/event"
	router "marwan.io/vecty-router"
)

type PIndex struct {
	vecty.Core
	count int
}

func (p *PIndex) Render() vecty.ComponentOrHTML {
	return elem.Body(
		elem.Heading1(vecty.Text("Hello Vecty!!")),
		elem.Div(&components.CButton{}),
		elem.Div(&components.CButton{}),
		elem.Anchor(
			vecty.Markup(
				event.Click(func(e *vecty.Event) {
					router.Redirect("/example")
				}),
			),
			vecty.Text("/exampleへ"),
		),
	)
}
