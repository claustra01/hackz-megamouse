package main

import (
	"github.com/kyoto-framework/kyoto/v2"
)

func main() {
	kyoto.HandlePage("/", PIndex)
	kyoto.HandleAction(CUUID)
	kyoto.Serve(":8080")
}
