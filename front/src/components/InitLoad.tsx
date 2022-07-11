import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { commentsState, loginState, Member, membersState } from "../state/atoms"
import { INIT_LOAD_QUERY, SUBSCRIPTION } from "../utils/client"

type InitLoadProps = {
    afterAddMember: () => void
}

const InitLoad: React.FC<InitLoadProps> = ({ afterAddMember }) => {
    const result = useQuery(INIT_LOAD_QUERY)
    const setComments = useSetRecoilState(commentsState)
    const setMembers = useSetRecoilState(membersState)
    const [ login, setLogin ] = useRecoilState(loginState)

    useEffect(() => {
        if (result && result.data) {
            setComments(result.data.messages)
            if (result.data.members.length > 0) {
                setMembers(result.data.members)
            }
            afterAddMember()
        }
    }, [result, setComments, setMembers, afterAddMember])

    useEffect(()=> {
        const disconnect = result.subscribeToMore({
            document: SUBSCRIPTION,
            variables: { user: login.user },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const resp = subscriptionData.data.subscribe;
                let retOb = {};
                if (resp.message) {
                    const messages = prev.messages ? [...prev.messages, resp.message] : [resp.message]
                    setComments(messages)
                    retOb = Object.assign({}, prev, { messages })
                }
                if (resp.user) {
                    const members = prev.members ? [resp.user, ...prev.members] : [resp.user]
                    if (!members.some(m => m.user === login.user)) members.push(login)
                    setMembers(members)
                    afterAddMember()
                    retOb = Object.assign({}, prev, { members }) 
                }
                if (resp.leave) {
                    const newMembers = prev.members.filter((m: Member) => m.user !== resp.leave.user)
                    retOb = Object.assign({}, prev, { members: newMembers })
                }
                return retOb
            }
        })
        setLogin({ ...login, disconnect })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return <></>
}
export default InitLoad
