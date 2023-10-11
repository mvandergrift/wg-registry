package service

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"go.uber.org/zap"
)

type Route interface {
	http.Handler

	Pattern() string
	RequiresAuth() bool
}

type AuthMiddleware interface {
	EnsureValidToken(http.Handler) http.Handler
}

func NewServeMux(routes []Route, auth0 AuthMiddleware, log *zap.Logger) *chi.Mux {
	r := chi.NewRouter()

	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)

	for _, route := range routes {
		log.Debug("Registering route", zap.String("pattern", route.Pattern()))

		if route.RequiresAuth() {
			r.With(auth0.EnsureValidToken).Handle(route.Pattern(), route)
		} else {
			r.Handle(route.Pattern(), route)
		}
	}

	return r
}
