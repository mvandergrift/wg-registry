package handler

import (
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/playground"
	"go.uber.org/zap"
)

type PlaygroundHandler struct {
	Port   string
	Server http.HandlerFunc
	Logger *zap.Logger
}

func NewPlaygroundHandler(log *zap.Logger) PlaygroundHandler {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	playgroundHandler := playground.Handler("GraphQL playground", "/graphql")

	return PlaygroundHandler{
		Port:   port,
		Server: playgroundHandler,
		Logger: log,
	}
}

func (h PlaygroundHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.Logger.Info("Handling request", zap.String("path", r.URL.Path))
	h.Server.ServeHTTP(w, r)
}

func (PlaygroundHandler) Pattern() string {
	return "/"
}

func (PlaygroundHandler) RequiresAuth() bool {
	return false
}
