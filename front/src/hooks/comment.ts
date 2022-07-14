import { useMutation } from "@apollo/client"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { MessageResources } from "../resources"
import { bottomInfoState, FeedRow, inputCommentState, loginState } from "../state/atoms"
import { ADD_COMMENT } from "../utils/client"
import { useLogout } from "./logout"


export const useSendComment = () => {
    const [ addComment ] = useMutation(ADD_COMMENT)
    const login = useRecoilValue(loginState)
    const setErr = useSetRecoilState(bottomInfoState)
    const [ comment, setComment ] = useRecoilState(inputCommentState)
    const logout = useLogout()

    return async () => {
        const ret: any = await addComment({ variables: { ...login, text: comment }}).catch((e) => {
            console.log(e)
            logout()
        })

        const resp: FeedRow = ret.data.postMessage
        if (resp.MessageType === "error") {
            setErr(MessageResources.get(resp.text, "200"))
        } else {
            setComment("")
            setErr("")
        }
    }
}