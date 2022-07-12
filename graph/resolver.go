package graph

import (
	"go-chat/graph/model"
	"sync"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	subscribers map[string]chan<- *model.SubscriptionResponse
	messages    []*model.Message
	mutex       sync.Mutex
}

func (r *Resolver) IsSubscribe(user string) bool {
	_, ok := r.subscribers[user]
	return ok
}

func NewResolver() *Resolver {
	return &Resolver{
		subscribers: map[string]chan<- *model.SubscriptionResponse{},
		mutex:       sync.Mutex{},
	}
}
