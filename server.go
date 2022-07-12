package main

import (
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"go-chat/graph"
	"go-chat/graph/generated"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

type ErrorType = string

const (
	defaultPort      = "8080"
	UserNameTooLong  = ErrorType("user_name_too_long")
	UserAlreadyExist = ErrorType("user_already_exist")
)

func graphqlHandler(resolver *graph.Resolver) gin.HandlerFunc {
	srv := handler.New(generated.NewExecutableSchema(generated.Config{Resolvers: resolver}))
	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			CheckOrigin:     func(r *http.Request) bool { return true },
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
		KeepAlivePingInterval: 15 * time.Second,
	})
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})
	srv.Use(extension.Introspection{})

	return func(c *gin.Context) {
		srv.ServeHTTP(c.Writer, c.Request)
	}
}

func playgroundHandler() gin.HandlerFunc {
	srv := playground.Handler("GraphQL", "/query")
	return func(c *gin.Context) {
		srv.ServeHTTP(c.Writer, c.Request)
	}
}

type LoginResponse struct {
	Token string    `json:"token"`
	Error ErrorType `json:"error"`
}

func loginHandler(resolver *graph.Resolver) gin.HandlerFunc {
	return func(c *gin.Context) {
		user := c.PostForm("user")
		if len(user) > 5 {
			c.JSON(400, &LoginResponse{Error: UserNameTooLong})
		} else if resolver.IsSubscribe(user) {
			c.JSON(400, &LoginResponse{Error: UserAlreadyExist})
		} else {
			c.JSON(200, &LoginResponse{Token: "ok"})
		}
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	router := gin.New()
	router.Use(cors.New(cors.Config{
		AllowMethods: []string{"GET", "POST", "OPTIONS", "PUT"},
		AllowHeaders: []string{"Origin", "Content-Type"},
		AllowOrigins: []string{
			"http://localhost:3000/",
		},
		AllowOriginFunc: func(origin string) bool { return true },
	}))
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	resolver := graph.NewResolver()

	router.GET("/", playgroundHandler())
	router.POST("/login", loginHandler(resolver))
	router.Any("/query", graphqlHandler(resolver))

	router.Run(":" + port)
}
