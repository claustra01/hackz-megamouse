package pages

import (
	"github.com/claustra01/hackz-megamouse/client/components"
	"github.com/claustra01/hackz-megamouse/client/utils/auth"
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
	router "marwan.io/vecty-router"
)

type PIndex struct {
	vecty.Core
	isLoggedIn bool
	isAdmin    bool
	userId     int
}

func (p *PIndex) Mount() {

	p.isLoggedIn, p.isAdmin, p.userId = auth.TokenAuth()
	vecty.Rerender(p)
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
					Event: func(e *vecty.Event) {
						router.Redirect("/login")
					},
				},
			}),
			elem.Div(&components.CTitleButton{
				Props: components.CTitleButtonProps{
					Text: "Sign Up",
					Event: func(e *vecty.Event) {
						router.Redirect("/signup")
					},
				},
			}),
		),
	)
}
