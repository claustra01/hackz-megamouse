package pages

import (
	"github.com/claustra01/hackz-megamouse/client/components"
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
)

type PIndex struct {
	vecty.Core
	count int
}

func (p *PIndex) Render() vecty.ComponentOrHTML {
	vecty.AddStylesheet("/assets/css/index.css")
	return elem.Body(
		elem.Div(&components.CHeader{}),
		elem.Div(
			vecty.Markup(
				vecty.Class("index"),
			),
			elem.Div(&components.CTitle{}),
			elem.Div(&components.CTitleButton{
				Props: components.CTitleButtonProps{
					Text: "Login",
				},
			}),
			elem.Div(&components.CTitleButton{
				Props: components.CTitleButtonProps{
					Text: "Sign Up",
				},
			}),
		),
	)
}
