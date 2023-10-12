package db

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/subosito/gotenv"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"

	"go.uber.org/zap"
)

type ControlPanelCn struct {
	Db     *bun.DB
	Logger *zap.Logger
}

func NewControlPanelCn(log *zap.Logger) *ControlPanelCn {
	gotenv.Load()
	host := os.Getenv("CP_HOST")
	user := os.Getenv("CP_USER")
	password := os.Getenv("CP_PASSWORD")

	dsn := fmt.Sprintf("postgres://%s:%s@%s/controlplane?sslmode=disable", user, password, host)
	// dsn := "unix://user:pass@dbname/var/run/postgresql/.s.PGSQL.5432"
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))

	cn := bun.NewDB(sqldb, pgdialect.New())

	return &ControlPanelCn{
		Db:     cn,
		Logger: log,
	}
}
