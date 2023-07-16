package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/kyoto-framework/kyoto/v2"
)

type CUUIDState struct {
	UUID string
}

func CUUID(ctx *kyoto.Context) (state CUUIDState) {
	// Define uuid loader
	uuid := func() string {
		resp, _ := http.Get("http://httpbin.org/uuid")
		data := map[string]string{}
		json.NewDecoder(resp.Body).Decode(&data)
		return data["uuid"]
	}
	// Handle action
	handled := kyoto.Action(ctx, "Reload", func(args ...any) {
		// We will just set a new uuid and will print a log
		// It's not makes a lot of sense now, but it's just a demonstration example
		state.UUID = uuid()
		log.Println("New uuid was issued:", state.UUID)
	})
	// Prevent further execution if action handled
	if handled {
		return
	}
	// Default loading behavior
	state.UUID = uuid()
	// Return
	return
}
