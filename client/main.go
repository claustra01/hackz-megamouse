package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/kyoto-framework/kyoto/v2"
)

// This example demonstrates main advantage of kyoto library - asynchronous lifecycle.
// Multiple UUIDs will be fetched from httpbin in asynchronous way, without explicitly touching goroutines
// and synchronization tools like sync.WaitGroup.

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

type PIndexState struct {
	UUID1 *kyoto.ComponentF[CUUIDState]
	UUID2 *kyoto.ComponentF[CUUIDState]
}

func PIndex(ctx *kyoto.Context) (state PIndexState) {
	// Define rendering
	kyoto.Template(ctx, "page.index.html")
	// Attach components
	state.UUID1 = kyoto.Use(ctx, CUUID)
	state.UUID2 = kyoto.Use(ctx, CUUID)
	// Return
	return
}

func main() {
	kyoto.HandlePage("/", PIndex)
	kyoto.HandleAction(CUUID)
	kyoto.Serve(":3000")
}
