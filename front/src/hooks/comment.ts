import { useMutation } from "@apollo/client"
import { useCallback } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { MessageResources } from "../resources"
import { bottomInfoState, connectIntervalSelector, FeedRow, inputCommentState, loginState } from "../state/atoms"
import { ADD_COMMENT } from "../utils/client"
import { useLogout } from "./logout"


export const useKeepAlive = () => {
    const setLastTime = useSetRecoilState(connectIntervalSelector)

    const updateLastTime = useCallback(() => {
        setLastTime(new Date().getTime())
    }, [setLastTime])

    return {
        updateLastTime
    }
}

export const useSendComment = () => {
    const [ addComment ] = useMutation(ADD_COMMENT)
    const login = useRecoilValue(loginState)
    const setErr = useSetRecoilState(bottomInfoState)
    const [ comment, setComment ] = useRecoilState(inputCommentState)
    const logout = useLogout()
    const { updateLastTime } = useKeepAlive()

    return async () => {
        const ret: any = await addComment({ variables: { ...login, text: comment }}).catch((e) => {
            console.log(e)
            logout()
        })

        const resp: FeedRow = ret.data.postMessage
        updateLastTime()

        if (resp.MessageType === "error") {
            setErr(MessageResources.get(resp.text, "200"))
        } else {
            setComment("")
            setErr("")
        }
    }
}