package auth

import (
	"context"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/jwks"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"github.com/subosito/gotenv"
)

type Auth0 struct {
	auth0Audience string
	auth0Domain   string
}

// NewAuth0 returns a new Auth0 instance.
func NewAuth0() Auth0 {
	err := gotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return Auth0{
		auth0Audience: os.Getenv("AUTH0_AUDIENCE"),
		auth0Domain:   os.Getenv("AUTH0_DOMAIN"),
	}
}

// EnsureValidToken is a middleware that will check the validity of our JWT.
func (a Auth0) EnsureValidToken(next http.Handler) http.Handler {
	issuerURL, err := url.Parse("https://" + a.auth0Domain + "/")
	if err != nil {
		log.Fatalf("Failed to parse the issuer url: %v", err)
	}

	provider := jwks.NewCachingProvider(issuerURL, 5*time.Minute)

	jwtValidator, err := validator.New(
		provider.KeyFunc,
		validator.RS256,
		issuerURL.String(),
		[]string{a.auth0Audience},
		validator.WithCustomClaims(
			func() validator.CustomClaims {
				return &CustomClaims{}
			},
		),
		validator.WithAllowedClockSkew(time.Minute),
	)
	if err != nil {
		log.Fatalf("Failed to set up the jwt validator")
	}

	errorHandler := func(w http.ResponseWriter, r *http.Request, err error) {
		log.Printf("Encountered error while validating JWT: %v", err)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"message":"Failed to validate JWT."}`))
	}

	middleware := jwtmiddleware.New(
		jwtValidator.ValidateToken,
		jwtmiddleware.WithErrorHandler(errorHandler),
	)

	return middleware.CheckJWT(next)
}

type CustomClaims struct {
	Scope string `json:"scope"`
}

// NOP, only included to satisy the CustomClaims interface.
func (c CustomClaims) Validate(ctx context.Context) error {
	return nil
}

// Check if our token has the expected scope.
func (c CustomClaims) HasScope(expectedScope string) bool {
	result := strings.Split(c.Scope, " ")
	for i := range result {
		if result[i] == expectedScope {
			return true
		}
	}

	return false
}
