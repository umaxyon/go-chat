import React from 'react'
import { formatYMDHms } from '../utils'
import { FeedRow } from '../state/atoms'


type CommentPanelProps = {
    feed: FeedRow
}

const CommentPanel: React.FC<CommentPanelProps> = ({ feed }) => {
    const createdAt = formatYMDHms(new Date(feed.createdAt))
    let component = <></>
    if (["addMember", "leaveMember"].includes(feed.MessageType)) {
        const inout = feed.MessageType === "addMember" ? "入室" : "退室"
        component = (
            <div className="w-full pt-2 text-xs">
                <div className="flex flex-row w-full justify-between pb-1">
                    <div>
                        {feed.user}が{inout}しました
                    </div>
                    <div className="text-slate-400">
                        {createdAt}
                    </div>
                </div>
            </div>
        )
    } else if (feed.MessageType === "comment") {
        component = (
            <div className="w-full pt-2 text-xs">
                <div className="flex flex-row w-full justify-between pb-1">
                    <div className="inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">
                        {feed.user}
                    </div>
                    <div className="text-slate-400">
                        {createdAt}
                    </div>
                </div>
                <div className="ml-7 p-2 bg-green-200 text-sm balloon rounded-lg">
                    {feed.text.split(/(\n)/g).map(t => (t === '\n'?<br />: t))}
                </div>
            </div>
        )
    }

    return component
}
export default CommentPanel
