package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"go-chat/graph/generated"
	"go-chat/graph/model"
	"log"
	"sort"
	"time"
	"unicode/utf8"

	"github.com/segmentio/ksuid"
)

func (r *mutationResolver) PostMessage(ctx context.Context, user string, text string, token string) (*model.Message, error) {
	loginToken, ok := r.loginTokens[user]
	if !ok || loginToken != token {
		err := fmt.Errorf("`%s` is not login", user)
		log.Print(err.Error())
		return nil, err
	}

	if utf8.RuneCountInString(text) > 200 {
		return &model.Message{
			ID:          "",
			MessageType: "error",
			Text:        "text_size_over",
			CreatedAt:   time.Now(),
		}, nil
	}

	message := &model.Message{
		ID:          ksuid.New().String(),
		MessageType: "comment",
		CreatedAt:   time.Now(),
		User:        user,
		Text:        text,
	}

	r.mutex.Lock()
	r.messages = append(r.messages, message)
	for _, ch := range r.subscribers {
		ch <- &model.SubscriptionResponse{Message: message}
	}
	r.mutex.Unlock()

	return message, nil
}

func (r *mutationResolver) KeepAlive(ctx context.Context, user string, token string) (bool, error) {
	ch := r.subscribers[user]
	ch <- &model.SubscriptionResponse{ConnectKeep: &[]bool{true}[0]}
	return true, nil
}

func (r *queryResolver) Messages(ctx context.Context) ([]*model.Message, error) {
	sort.SliceStable(r.messages, func(i, j int) bool {
		return r.messages[i].CreatedAt.Unix() < r.messages[j].CreatedAt.Unix()
	})
	return r.messages, nil
}

func (r *queryResolver) Members(ctx context.Context) ([]*model.User, error) {
	var users []*model.User
	for user := range r.subscribers {
		users = append(users, &model.User{User: user})
	}
	return users, nil
}

func (r *subscriptionResolver) Subscribe(ctx context.Context, user string) (<-chan *model.SubscriptionResponse, error) {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	if _, ok := r.subscribers[user]; ok {
		err := fmt.Errorf("`%s` has already been subscribed", user)
		log.Print(err.Error())
		return nil, err
	}

	ch := make(chan *model.SubscriptionResponse, 1)
	r.subscribers[user] = ch
	log.Printf("`%s` has been subscribed!", user)

	message := &model.Message{
		ID:          ksuid.New().String(),
		User:        user,
		CreatedAt:   time.Now(),
		MessageType: "addMember",
	}

	r.messages = append(r.messages, message)
	for _, ch := range r.subscribers {
		ch <- &model.SubscriptionResponse{
			User:    &model.User{User: user},
			Message: message,
		}
	}

	go func() {
		<-ctx.Done()

		message := &model.Message{
			ID:          ksuid.New().String(),
			User:        user,
			CreatedAt:   time.Now(),
			MessageType: "leaveMember",
		}

		r.mutex.Lock()
		r.RemoveUser(user)
		r.messages = append(r.messages, message)
		r.mutex.Unlock()
		log.Printf("`%s` has been unsubscribed.", user)
		for _, ch := range r.subscribers {
			ch <- &model.SubscriptionResponse{
				Leave:   &model.User{User: user},
				Message: message,
			}
		}
	}()

	return ch, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }
