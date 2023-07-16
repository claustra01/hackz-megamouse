package pages

import (
	"syscall/js"

	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
	router "marwan.io/vecty-router"
)

type PLogout struct {
	vecty.Core
}

func (p *PLogout) Mount() {
	js.Global().Get("document").Set("cookie", "token=")
	router.Redirect("/")

}

func (p *PLogout) Render() vecty.ComponentOrHTML {
	return elem.Body()
}
