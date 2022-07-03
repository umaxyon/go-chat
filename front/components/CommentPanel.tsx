import React from 'react'
import { Comment } from '../state/atoms'


type CommentPanelProps = {
    comment: Comment
}

const CommentPanel: React.FC<CommentPanelProps> = ({ comment }) => {
    return (
        <div className="w-full p-2 bg-green-100 text-sm">
            {comment.text}
        </div>
    )
}
export default CommentPanel
