package main

import (
	"fmt"

	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
)

func main() {
	fmt.Println("hogehoge")
	vecty.SetTitle("べくてぃー！！")
	vecty.RenderBody(new(page))
}

type page struct {
	vecty.Core
}

func (p *page) Render() vecty.ComponentOrHTML {
	return elem.Body(
		elem.Heading1(vecty.Text("Hello Vecty!!")),
		elem.Button(vecty.Text("button")),
	)
}
