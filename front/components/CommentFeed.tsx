import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { commentsState, membersState } from "../state/atoms"
import { MESSAGE_QUERY, SUBSCRIPTION } from "./client"
import CommentPanel from "./CommentPanel"


type CommentFeedProps = {
    user: string
}

const CommentFeed: React.FC<CommentFeedProps> = ({ user }) => {
    const [ comments, setComments ] = useRecoilState(commentsState)
    const setMembers = useSetRecoilState(membersState)
    const result = useQuery(MESSAGE_QUERY)

    useEffect(() => {
        if (result && result.data) {
            setComments(result.data.messages)
            if (result.data.members.length > 0) {
                setMembers(result.data.members)
            }
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
                    const messages = prev.messages ? [...prev.messages, resp.message] : [resp.message]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const feed = !comments ? <></> : comments.map(c => {
        return <CommentPanel key={c.id} comment={c} />
    })

    return (
        <div className="flex flex-col justify-end gap-1 border border-gray-300 min-w-3/4 h-full rounded-tr p-1">
            {feed}
        </div>
    )
}
export default CommentFeed