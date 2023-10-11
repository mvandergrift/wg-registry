package db

import (
	"database/sql"
	"os"
	"time"

	"github.com/ClickHouse/clickhouse-go/v2"
	"github.com/subosito/gotenv"

	"go.uber.org/zap"
)

type ClickCn struct {
	Db     *sql.DB
	Logger *zap.Logger
}

func NewClickCn(log *zap.Logger) *ClickCn {
	conn, err := connect()
	if err != nil {
		log.Error("Failed to connect to ClickHouse", zap.Error(err))
	}

	return &ClickCn{
		Db:     conn,
		Logger: log,
	}
}

func connect() (*sql.DB, error) {
	gotenv.Load()
	host := os.Getenv("CLICKHOUSE_HOST")
	user := os.Getenv("CLICKHOUSE_USER")
	password := os.Getenv("CLICKHOUSE_PASSWORD")

	conn := clickhouse.OpenDB(&clickhouse.Options{
		Addr: []string{host},
		Auth: clickhouse.Auth{
			Database: "cosmo",
			Username: user,
			Password: password,
		},
		Protocol: clickhouse.HTTP,
		Debug:    true,
	})

	// if err := conn.Ping(); err != nil {
	// 	if exception, ok := err.(*clickhouse.Exception); ok {
	// 		fmt.Printf("Exception [%d] %s \n%s\n", exception.Code, exception.Message, exception.StackTrace)
	// 	}
	// 	return nil, err
	// }

	conn.SetMaxIdleConns(5)
	conn.SetMaxOpenConns(10)
	conn.SetConnMaxLifetime(time.Hour)
	return conn, nil
}
