import React from 'react'
import { formatYMDHms } from '../utils'
import { FeedRow } from '../state/atoms'


type CommentPanelProps = {
    comment: FeedRow
}

const CommentPanel: React.FC<CommentPanelProps> = ({ comment }) => {
    const createdAt = formatYMDHms(new Date(comment.createdAt))
    let component = <></>
    switch(comment.MessageType) {
        case "comment":
            component = (
            <div className="w-full pt-2 text-xs">
                <div className="flex flex-row w-full justify-between pb-1">
                    <div className="inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">
                        {comment.user}
                    </div>
                    <div className="text-slate-400">
                        {createdAt}
                    </div>
                </div>
                <div className="ml-7 p-2 bg-green-200 text-sm balloon rounded-lg">
                    {comment.text}
                </div>
            </div>
        ); break
        case "addMember":
            component = (
            <div className="w-full pt-2 text-xs">
                <div className="flex flex-row w-full justify-between pb-1">
                    <div>
                        {comment.user}が入室しました
                    </div>
                    <div className="text-slate-400">
                        {createdAt}
                    </div>
                </div>
            </div>
        ); break
        default : component = <></>
    }

    return component
}
export default CommentPanel
