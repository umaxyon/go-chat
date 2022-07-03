import { useMutation } from "@apollo/client"
import { ChangeEventHandler, useState } from "react"
import { ADD_COMMENT } from "./client"

type CommentSenderPanelProps = {
    user: string
}

const CommentSenderPanel: React.FC<CommentSenderPanelProps> = ({ user }) => {
    const [ addComment, { error } ] = useMutation(ADD_COMMENT)
    const [ comment, setComment ] = useState<string>("")

    const onChangeComment: ChangeEventHandler<HTMLInputElement> = (e) => {
        setComment(e.target.value)
    }

    const onClickSubmit = async () => {
        await addComment({ variables: { user, text: comment }})
    }

    return (
        <>
        { error ? <span>{error.message}</span>: null }
        <div className="flex justify-center gap-2">
            <input type="text" placeholder='入力してください' onChange={onChangeComment}
            className="
                block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding
                border border-solid border-gray-300 rounded py-1.5 px-3 transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
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