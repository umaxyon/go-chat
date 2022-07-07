import { useQuery } from "@apollo/client"
import { useCallback, useEffect, useRef } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { commentsState, loginState, membersState } from "../state/atoms"
import { MESSAGE_QUERY, SUBSCRIPTION } from "../utils/client"
import CommentPanel from "./CommentPanel"


type CommentFeedProps = {
    user: string
}

const CommentFeed: React.FC<CommentFeedProps> = ({ user }) => {
    const [ comments, setComments ] = useRecoilState(commentsState)
    const [ login, setLogin ] = useRecoilState(loginState)
    const setMembers = useSetRecoilState(membersState)
    const scrollBottomRef = useRef<HTMLDivElement>(null);
    const result = useQuery(MESSAGE_QUERY)

    const scrollEnd = useCallback(() => {
        scrollBottomRef!.current!.scrollIntoView({ block: 'end' })
    }, [scrollBottomRef])

    useEffect(() => {
        if (result && result.data) {
            setComments(result.data.messages)
            if (result.data.members.length > 0) {
                setMembers(result.data.members)
            }
            scrollEnd()
        }
    }, [result, setComments, setMembers, scrollEnd])

    useEffect(()=> {
        const disconnect = result.subscribeToMore({
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
                    if (!members.some(m => m.user === login.user)) members.push(login)
                    setMembers(members)
                    setTimeout(scrollEnd, 0)
                    return Object.assign({}, prev, { members })
                }
            }
        })
        setLogin({ ...login, disconnect })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const feed = !comments ? <></> : comments.map(c => {
        return <CommentPanel key={c.id} comment={c} />
    })

    return (
        <div className="
            border border-gray-300 min-w-3/4 h-full rounded-tr p-1
            overflow-y-scroll overflow-x-hidden scrollDiv">
            <div className="flex flex-col justify-end gap-1">{feed}</div>
            <div ref={scrollBottomRef} />
        </div>
    )
}
export default CommentFeed