package pages

import (
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
)

type PExample struct {
	vecty.Core
}

func (p *PExample) Render() vecty.ComponentOrHTML {
	return elem.Body(
		elem.Heading1(vecty.Text("Hello Vecty!!")),
		elem.Div(vecty.Text("example page")),
	)
}
