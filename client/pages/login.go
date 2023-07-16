package pages

import (
	"encoding/json"
	"net/http"
	"syscall/js"

	"github.com/claustra01/hackz-megamouse/client/utils/jslog"
	"github.com/hexops/vecty"
	"github.com/hexops/vecty/elem"
	"github.com/hexops/vecty/event"
	router "marwan.io/vecty-router"
)

type PLogin struct {
	vecty.Core
	email    string
	password string
}

func (p *PLogin) Render() vecty.ComponentOrHTML {
	vecty.AddStylesheet("/assets/css/auth.css")
	return elem.Body(
		elem.TextArea(
			vecty.Markup(
				event.Input(p.onEmailInput),
			),
		),
		elem.TextArea(
			vecty.Markup(
				event.Input(p.onPasswordInput),
			),
		),
		elem.Button(
			vecty.Markup(
				event.Click(p.onClick),
			),
			vecty.Text("Login"),
		),
	)
}

func (p *PLogin) onEmailInput(e *vecty.Event) {
	p.email = e.Target.Get("value").String()
}

func (p *PLogin) onPasswordInput(e *vecty.Event) {
	p.password = e.Target.Get("value").String()
}

type ReqBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type ResBody struct {
	Token string
}

func parseJson(jsonBody js.Value) ResBody {
	return ResBody{
		Token: jsonBody.Get("token").String(),
	}
}

func (p *PLogin) onClick(e *vecty.Event) {

	// create body
	jsonBody, err := json.Marshal(ReqBody{
		Email:    p.email,
		Password: p.password,
	})
	if err != nil {
		jslog.ConsoleLog(err)
		return
	}

	// fetch()
	endpoint := "/api/login"
	uint8Array := js.Global().Get("Uint8Array").New(len(jsonBody))
	js.CopyBytesToJS(uint8Array, jsonBody)
	fetchPromise := js.Global().Call("fetch", endpoint, js.ValueOf(map[string]interface{}{
		"method":  "POST",
		"headers": map[string]interface{}{"Content-Type": "application/json"},
		"body":    uint8Array,
	}))

	// .then(), 成功したとき
	fetchPromise.Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		response := args[0]
		if response.Get("status").Int() == http.StatusOK {
			// parse json
			response.Call("json").Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
				resBody := parseJson(args[0])

				// save cookie
				js.Global().Get("document").Set("cookie", "token="+resBody.Token)
				jslog.ConsoleLog("Login Successful!")

				// redirect
				router.Redirect("/")
				return nil
			}))
		}
		return nil
	}))

	// .catch(), 失敗したとき
	fetchPromise.Call("catch", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		err := args[0]
		jslog.ConsoleLog("Request Error:", err)
		return nil
	}))

}
