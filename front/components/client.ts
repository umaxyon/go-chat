import { split, HttpLink, ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
    uri: 'http://localhost:8080/query'
})

const wsLink = typeof window !== "undefined" ? new GraphQLWsLink(createClient({
    url: 'ws://localhost:8080/query',
})) : httpLink;

const splitLink = split(({ query }) => {
    const definition = getMainDefinition(query)
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription')
}, wsLink, httpLink)

export const client = new ApolloClient({ link: splitLink, cache: new InMemoryCache() })

export const ADD_COMMENT = gql`
mutation($user: String!, $text: String!) {
  postMessage(user: $user, text: $text) {
    id
    user
    text
    createdAt
  }
}
`