package handler

import (
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/mvandergrift/registry-svc/graph"
	"github.com/mvandergrift/registry-svc/internal/db"
	"github.com/subosito/gotenv"
	"go.uber.org/zap"
)

const defaultPort = "8080"

type GraphQLHandler struct {
	Port   string
	Server *handler.Server
	Logger *zap.Logger
}

func NewGraphQLHandler(db *db.ClickCn, wg *db.WunderGraphCn, cp *db.ControlPanelCn, log *zap.Logger) *GraphQLHandler {
	gotenv.Load()
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{Cn: db, Wg: wg, Cp: cp}}))

	return &GraphQLHandler{
		Port:   port,
		Server: srv,
		Logger: log,
	}
}

func (h *GraphQLHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.Logger.Info("Handling request", zap.String("path", r.URL.Path))
	h.Server.ServeHTTP(w, r)
}

func (*GraphQLHandler) Pattern() string {
	return "/graphql"
}

func (*GraphQLHandler) RequiresAuth() bool {
	return false
}
