import { useCallback, useRef } from "react"
import { useRecoilValue } from "recoil"
import { commentsState } from "../state/atoms"
import CommentPanel from "./CommentPanel"
import InitLoad from "./InitLoad"


type CommentFeedProps = {
}

const CommentFeed: React.FC<CommentFeedProps> = () => {
    const comments = useRecoilValue(commentsState)
    const scrollBottomRef = useRef<HTMLDivElement>(null);

    const scrollEnd = useCallback(() => {
        scrollBottomRef!.current!.scrollIntoView({ block: 'end' })
    }, [scrollBottomRef])

    const feed = !comments ? <></> : comments.map(c => {
        return <CommentPanel key={c.id} comment={c} />
    })

    return (
        <>
        <InitLoad afterAddMember={() => setTimeout(scrollEnd, 0) } />
        <div className="
            border border-gray-300 min-w-3/4 h-full rounded-tr p-1
            overflow-y-scroll overflow-x-hidden scrollDiv">
            <div className="flex flex-col justify-end gap-1">{feed}</div>
            <div ref={scrollBottomRef} />
        </div>
        </>
    )
}
export default CommentFeed