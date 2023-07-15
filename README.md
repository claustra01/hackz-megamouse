## 開発環境での実行
### Dockerを使用する
- `docker compose up --build` でビルド&実行できる
- `http://localhost/` 以下がfrontend
- `http://localhost/api/` 以下がbackend
### frontendのみ
- wasmserveが入っていなければ `go install github.com/hajimehoshi/wasmserve@latest` を実行
- `/client` に移動して `wasmserve` を実行
- `http://localhost:8080/` を開く
### backendのみ
- airが入っていなければ `go install github.com/cosmtrek/air@latest` を実行
- `/server` に移動して `air` を実行
- `http://localhost:8081/` を開く
### dbのマイグレーション
- `/server/main.go`内で`db.Migrate()`を1回実行すればマイグレーション&初期化が完了

## エラー・ログについて
### frontend
- `github.com/claustra01/hackz_megamouse/client/utils/js` をimportする
- `js.ConsoleLog("log message...")` でブラウザのdevtoolにログを出力できる
### backend
- `log.Fatal("[ERROR] ", err)` アプリを止めるべき致命的なエラー (例: .envファイルが見つからない)
- `log.Print("[ERROR] ", err)` アプリを止める必要のないレベルのエラー (例: レスポンスが返ってこない)
- `log.Print("[INFO] log message...")` エラーではない通常のログ

## コミットについて
- `:sparkles: commit message...` のような形で最初に絵文字を付ける
- 絵文字の種類については`gitmoji.md`を参照