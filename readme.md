# Goでチャット
(作りかけ)

[gqlgen](https://github.com/99designs/gqlgen)でgraphQLサーバー立てるサンプル

### 起動
```shell
go run server.go
```
ブラウザから http://localhost:8080/ (GraphQL playground)

* 購読
```graphql
subscription($user: String!) {
  messagePosted(user: $user) {
    id
    user
    text
    createdAt
  }
}
```
* メッセージPost
```graphql
mutation($user: String!, $text: String!) {
  postMessage(user: $user, text: $text) {
    id
    user
    text
    createdAt
  }
}
```


### 初回作成時の手順

```shell
go get github.com/99designs/gqlgen      # インストール
go run github.com/99designs/gqlgen init # 初期化(色々自動生成)
```

初期化後
```
├── go.mod
├── go.sum
├── gqlgen.yml
├── graph
│   ├── generated
│   │   └── generated.go
│   ├── model
│   │   └── models_gen.go
│   ├── resolver.go           # [3]
│   ├── schema.graphqls       # [1]
│   └── schema.resolvers.go   # [2]
└── server.go
```
* [1] のスキーマ定義を好きに書き換える

* [2] を削除して、generateで再生成
```shell
go run github.com/99designs/gqlgen generate  # 再生成
```

* [3] のresolver.goのResolverにsubscriberとmutexを定義する
```go
type Resolver struct {
    subscribers map[string]chan<- *model.Message  // 購読者毎のchannelのマップ
    messages    []*model.Message
    mutex       sync.Mutex
}
```

* [2] の再生成されたひな形(schema.resolver.go)の、未実装メソッドの中身を実装する。
* server.goのResolver生成部を修正

