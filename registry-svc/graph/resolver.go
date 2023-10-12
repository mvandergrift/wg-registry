package graph

import (
	"github.com/mvandergrift/registry-svc/internal/db"
)

//go:generate go run github.com/99designs/gqlgen generate

type Resolver struct {
	Cn *db.ClickCn
	Wg *db.WunderGraphCn
	Cp *db.ControlPanelCn
}
