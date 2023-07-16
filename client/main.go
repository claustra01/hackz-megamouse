package main

import (
	"github.com/claustra01/hackz-megamouse/client/pages"
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
	router "marwan.io/vecty-router"
)

type page struct {
	vecty.Core
}

func (p *page) Render() vecty.ComponentOrHTML {
	return elem.Body(
		router.NewRoute("/", &pages.PIndex{}, router.NewRouteOpts{ExactMatch: true}),
		router.NewRoute("/login", &pages.PLogin{}, router.NewRouteOpts{ExactMatch: true}),
		router.NewRoute("/example", &pages.PExample{}, router.NewRouteOpts{ExactMatch: true}),
	)
}

func main() {
	vecty.SetTitle("Megamouse CTF")
	vecty.RenderBody(new(page))
}
