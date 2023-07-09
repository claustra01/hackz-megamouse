package main

import (
	"github.com/claustra01/hackz_megamouse/client/components"
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
)

type page struct {
	vecty.Core
	count int
}

func (p *page) Render() vecty.ComponentOrHTML {
	return elem.Body(
		elem.Heading1(vecty.Text("Hello Vecty!!")),
		elem.Div(&components.CButton{}),
		elem.Div(&components.CButton{}),
	)
}

func main() {
	vecty.SetTitle("べくてぃー！！")
	vecty.RenderBody(new(page))
}
