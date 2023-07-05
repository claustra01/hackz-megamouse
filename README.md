## 開発環境で実行
- `docker compose up --build` でビルド&実行できる
- `/` 以下がfrontend
- `/api/` 以下がbackend

## エラー・ログについて
3段階のフォーマットを使用
- `log.Fatal("[ERROR] ", err)` アプリを止めるべき致命的なエラー (例: .envファイルが見つからない)
- `log.Print("[ERROR] ", err)` アプリを止める必要のないレベルのエラー (例: レスポンスが返ってこない)
- `log.Print("[INFO] log message...")` エラーではない通常のログ

## コミットについて
- `:sparkles: commit message...` のような形で最初に絵文字を付ける
- 絵文字の種類については`gitmoji.md`を参照