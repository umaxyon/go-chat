import { ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useRef } from "react"
import { useRecoilState } from "recoil"
import { inputCommentState } from "../state/atoms"
import { useSendComment } from "../hooks/comment"

type CommentSenderPanelProps = {
}

const CommentSenderPanel: React.FC<CommentSenderPanelProps> = () => {
    const txtInput = useRef<HTMLTextAreaElement>(null)
    const [ comment, setComment ] = useRecoilState(inputCommentState)
    const sendComment = useSendComment()

    useEffect(() => txtInput.current?.focus())

    const onChangeComment: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
        setComment(e.target.value)
    }, [setComment])

    const onClickSubmit = useCallback(async () => {
        if (comment) {
            await sendComment()
        }
    }, [comment, sendComment])

    const onKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(async (e) => {
        if (e.key === 'Enter') {
            await onClickSubmit()
        }
    }, [onClickSubmit])

    return (
        <>
        <div className="flex justify-center gap-2">
            <textarea placeholder='入力してください' onChange={onChangeComment} onKeyUp={onKeyUp} value={comment} ref={txtInput}
            className="
                block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding
                border border-solid border-gray-300 rounded py-1.5 px-3 transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></textarea>
            <button type="button" onClick={onClickSubmit}
            className="
                inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase whitespace-nowrap
                rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none 
                focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">送信</button>
        </div>
        </>
    )
}
export default CommentSenderPanel