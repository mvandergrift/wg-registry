package model

import "github.com/uptrace/bun"

type API struct {
	bun.BaseModel `bun:"table:api"`

	Id               int     `json:"int"`
	Name             string  `json:"name"`
	FederatedGraphID string  `json:"federatedGraphId"`
	OwnerId          int     `json:"ownerId"`
	Description      *string `json:"description,omitempty"`
}

type APIOperation struct {
	bun.BaseModel `bun:"table:api_access"`

	FederatedGraphID string   `json:"federatedGraphId"`
	OperationID      string   `json:"operationId"`
	OperationName    string   `json:"operationName"`
	Duration         *float64 `json:"duration,omitempty"`
	AccessTime       *string  `json:"accessTime,omitempty"`
}

type Owner struct {
	bun.BaseModel `bun:"table:org_user"`

	UserId      int     `json:"userId"`
	Forename    *string `json:"forename,omitempty"`
	Surname     *string `json:"surname,omitempty"`
	Email       *string `json:"email,omitempty"`
	Phone       *string `json:"phone,omitempty"`
	Department  *string `json:"department,omitempty"`
	Title       *string `json:"title,omitempty"`
	ImageUrl    *string `json:"imageUrl,omitempty"`
	Description *string `json:"description,omitempty"`
}

type Application struct {
	bun.BaseModel `bun:"table:application"`

	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
	OwnerId     int     `json:"ownerId"`
}
