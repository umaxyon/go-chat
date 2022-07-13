package graph

import (
	"go-chat/graph/model"
	"sync"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	loginTokens map[string]string
	subscribers map[string]chan<- *model.SubscriptionResponse
	messages    []*model.Message
	mutex       sync.Mutex
}

func (r *Resolver) SaveToken(user, token string) {
	r.loginTokens[user] = token
}

func (r *Resolver) RemoveUser(user string) {
	delete(r.loginTokens, user)
	delete(r.subscribers, user)
}

func (r *Resolver) IsSubscribe(user string) bool {
	_, ok := r.subscribers[user]
	return ok
}

func NewResolver() *Resolver {
	return &Resolver{
		subscribers: map[string]chan<- *model.SubscriptionResponse{},
		loginTokens: map[string]string{},
		mutex:       sync.Mutex{},
	}
}
