import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { commentsState, membersState } from "../state/atoms"
import { MESSAGE_QUERY, SUBSCRIPTION } from "./client"


type CommentFeedProps = {
    user: string
}

const CommentFeed: React.FC<CommentFeedProps> = ({ user }) => {
    const [ comments, setComments ] = useRecoilState<any>(commentsState)
    const [ _, setMembers ] = useRecoilState<any>(membersState)
    const result = useQuery(MESSAGE_QUERY)

    useEffect(() => {
        if (result && result.data) {
            setComments(result.data.messages)
            setMembers(result.data.members)
        }
    }, [result, setComments, setMembers])

    useEffect(()=> {
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
                    const members = prev.members ? [resp.user, ...prev.members] : [resp.user]
                    setMembers(members)
                    return Object.assign({}, prev, { members })
                }
            }
        })
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
export default CommentFeed