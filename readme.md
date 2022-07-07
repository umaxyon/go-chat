# Goでチャット
<style>
img[src*='#center'] { display:block; margin: auto; }
</style>
![image](https://user-images.githubusercontent.com/73870939/177719442-81d5503f-d93a-4591-8d2a-9873d5bc3443.png#center)

### サーバー起動 
```shell
go run server.go  # port 8080
```
### フロント起動
```shell
cd front
yarn build
yarn start
```
ブラウザで http://localhost:3000 にアクセス

---

### ざっくり仕様

GraphQLのSubscription機能にて、WebSocketのプッシュ型配信のサンプル。
* [gqlgen](https://github.com/99designs/gqlgen)でGraphQLサーバー立てる。
* [Gin](https://github.com/gin-gonic/gin)でWeb公開。
* [NextJS](https://nextjs.org/)でフロント作る。
* [tailwindcss](https://tailwindcss.jp/)でデザイン。

---

### 初回作成時のメモ

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

