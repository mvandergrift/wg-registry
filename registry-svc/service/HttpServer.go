package service

import (
	"context"
	"net"
	"net/http"

	"github.com/go-chi/chi/v5"
	"go.uber.org/fx"
)

func NewHTTPServer[T http.ServeMux](lc fx.Lifecycle, mux *chi.Mux) *http.Server {
	srv := &http.Server{Addr: ":8081", Handler: mux}
	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			ln, err := net.Listen("tcp", srv.Addr)
			if err != nil {
				return err
			}

			go srv.Serve(ln)
			return nil
		},
		OnStop: func(ctx context.Context) error {
			return srv.Shutdown(ctx)
		},
	})
	return srv
}
