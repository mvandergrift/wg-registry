package main

import (
	"net/http"

	"go.uber.org/fx"
	"go.uber.org/zap"

	"github.com/mvandergrift/registry-svc/handler"
	"github.com/mvandergrift/registry-svc/internal/auth"
	"github.com/mvandergrift/registry-svc/internal/db"
	"github.com/mvandergrift/registry-svc/service"
)

func main() {
	fx.New(
		fx.Provide(
			zap.NewExample,
			db.NewClickCn,
			db.NewBunCn,
			service.NewHTTPServer,
			AsServiceMux(service.NewServeMux),
			AsAuthMiddleware(auth.NewAuth0),
			AsRoute(handler.NewHelloHandler),
			AsRoute(handler.NewGraphQLHandler),
			AsRoute(handler.NewPlaygroundHandler),
		),
		fx.Invoke(func(*http.Server) {}),
	).Run()
}

func AsRoute(f any) any {
	return fx.Annotate(
		f,
		fx.As(new(service.Route)),
		fx.ResultTags(`group:"routes"`),
	)
}

func AsServiceMux(f any) any {
	return fx.Annotate(
		f,
		fx.ParamTags(`group:"routes"`),
	)
}

func AsAuthMiddleware(f any) any {
	return fx.Annotate(
		f,
		fx.As(new(service.AuthMiddleware)),
	)
}
