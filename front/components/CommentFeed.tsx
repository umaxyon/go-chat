import { gql, useQuery, useSubscription } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const MESSAGE_QUERY = gql`
query GetMessages {
  messages {
    id
    user
    text
    createdAt
  }
  users {
    user
  }
}
`
const SUBSCRIPTION = gql`
subscription subscribeMessage($user: String!) {
  subscribeMessage(user: $user) {
    id
    user
    text
    createdAt
  }
}
`

type CommentFeedWithDataProps = {
    user: string
}

const CommentFeedWithData: React.FC<CommentFeedWithDataProps> = ({ user }) => {
    const [ comments, setComments ] = useState<any>([])

    const result = useQuery(MESSAGE_QUERY)

    const subscribeToNewComments = () => {
        result.subscribeToMore({
            document: SUBSCRIPTION,
            variables: { user },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.subscribeMessage;
                const messages = prev.messages ? [newFeedItem, ...prev.messages] : [newFeedItem]
                setComments(messages)
                return Object.assign({}, prev, { messages })
            }
        })
    }

    return <CommentFeed subscribeToNewComments={subscribeToNewComments} comments={comments} />
}

type CommentFeedProps = {
    subscribeToNewComments: any
    comments: any
}

const CommentFeed: React.FC<CommentFeedProps> = ({ subscribeToNewComments, comments }) => {
    const { data, loading } = useSubscription(SUBSCRIPTION)
    useEffect(()=> {
        subscribeToNewComments()
    },[])

    const feed = !comments ? <></> : comments.map(c => {
        return (
            <div key={c.id}>{c.text}</div>
        )
    })

    return (
        <div>{feed}</div>
    )
}
export default CommentFeedWithData