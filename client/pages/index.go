package pages

import (
	"github.com/claustra01/hackz-megamouse/client/components"
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
	"github.com/hexops/vecty/prop"
)

type PIndex struct {
	vecty.Core
	count int
}

func (p *PIndex) Render() vecty.ComponentOrHTML {
	return elem.Body(
		elem.Div(&components.CHeader{}),
		elem.Heading1(vecty.Text("Hello Vecty!!")),
		elem.Div(&components.CButton{}),
		elem.Div(&components.CButton{}),
		elem.Anchor(
			vecty.Markup(
				prop.Href("/example"),
			),
			vecty.Text("/exampleへ"),
		),
	)
}
