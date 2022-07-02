import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { commentsState, usersState } from "../state/atoms"
import { MESSAGE_QUERY, SUBSCRIPTION } from "./client"


type CommentFeedWithDataProps = {
    user: string
}

const CommentFeedWithData: React.FC<CommentFeedWithDataProps> = ({ user }) => {
    const [ comments, setComments ] = useRecoilState<any>(commentsState)
    const [ users, setUsers ] = useRecoilState<any>(usersState)


    const result = useQuery(MESSAGE_QUERY)

    useEffect(() => {
        if (result && result.data) {
            setComments(result.data.messages)
            setUsers(result.data.users)
        }
    }, [result, setComments, setUsers])

    const subscribeToNewComments = () => {
        result.subscribeToMore({
            document: SUBSCRIPTION,
            variables: { user },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const resp = subscriptionData.data.subscribe;
                if (resp.message) {
                    const messages = prev.messages ? [resp.message, ...prev.messages] : [resp.message]
                    setComments(messages)
                    return Object.assign({}, prev, { messages })
                }
                if (resp.user) {
                    const users = prev.users ? [resp.user, ...prev.users] : [resp.user]
                    setUsers(users)
                    return Object.assign({}, prev, { users })
                }
            }
        })
    }

    return <CommentFeed subscribeToNewComments={subscribeToNewComments} />
}

type CommentFeedProps = {
    subscribeToNewComments: any
}

const CommentFeed: React.FC<CommentFeedProps> = ({ subscribeToNewComments }) => {
    const comments: any = useRecoilValue(commentsState)
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