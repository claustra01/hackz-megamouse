package main

import "github.com/kyoto-framework/kyoto/v2"

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
