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

type WunderGraphCn struct {
	Db     *bun.DB
	Logger *zap.Logger
}

func NewWunderGraphCn(log *zap.Logger) *WunderGraphCn {
	gotenv.Load()
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")

	dsn := fmt.Sprintf("postgres://%s:%s@%s/wundergraph?sslmode=disable", user, password, host)
	// dsn := "unix://user:pass@dbname/var/run/postgresql/.s.PGSQL.5432"
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))

	cn := bun.NewDB(sqldb, pgdialect.New())

	return &WunderGraphCn{
		Db:     cn,
		Logger: log,
	}
}
