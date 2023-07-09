package components

import (
	"fmt"

	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
	"github.com/hexops/vecty/event"
)

type CButton struct {
	vecty.Core
	count int
}

func (c *CButton) Render() vecty.ComponentOrHTML {
	return elem.Button(
		vecty.Markup(event.Click(func(e *vecty.Event) {
			c.count++
			vecty.Rerender(c)
		})),
		vecty.Text(fmt.Sprintf("%d", c.count)),
	)
}
