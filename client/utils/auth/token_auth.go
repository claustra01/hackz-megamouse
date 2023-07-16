package auth

import (
	"net/http"
	"regexp"
	"syscall/js"

	"github.com/claustra01/hackz-megamouse/client/utils/jslog"
)

type ResBody struct {
	Id      int
	IsAdmin bool
}

func parseJson(jsonBody js.Value) ResBody {
	return ResBody{
		Id:      jsonBody.Get("id").Int(),
		IsAdmin: jsonBody.Get("is_admin").Bool(),
	}
}

func extractToken(cookie string) string {
	pattern := `token=([^;\s]+)`
	regex := regexp.MustCompile(pattern)
	match := regex.FindStringSubmatch(cookie)
	if len(match) >= 2 {
		return match[1]
	}
	return ""
}

func TokenAuth() (bool, bool, int) { // (isLoggedIn, idAdmin, userId)

	cookie := js.Global().Get("document").Get("cookie").String()
	token := extractToken(cookie)

	isLoggedIn := false
	isAdmin := false
	userId := 0

	// fetch()
	endpoint := "/api/auth"
	fetchPromise := js.Global().Call("fetch", endpoint, js.ValueOf(map[string]interface{}{
		"method": "GET",
		"headers": map[string]interface{}{
			"Content-Type":  "application/json",
			"Authorization": "Bearer " + token,
		},
	}))

	// .then(), 成功したとき
	fetchPromise.Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		response := args[0]
		if response.Get("status").Int() == http.StatusOK {
			// parse json
			response.Call("json").Call("then", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
				resBody := parseJson(args[0])

				// update status
				isLoggedIn = true
				isAdmin = resBody.IsAdmin
				userId = resBody.Id
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

	return isLoggedIn, isAdmin, userId

}
