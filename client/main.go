package main

import (
	"encoding/json"
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
	// Fetch uuid data
	resp, _ := http.Get("http://httpbin.org/uuid")
	data := map[string]string{}
	json.NewDecoder(resp.Body).Decode(&data)
	// Set state
	state.UUID = data["uuid"]
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
	// Register page
	kyoto.HandlePage("/", PIndex)
	// Serve
	kyoto.Serve(":3000")
}
