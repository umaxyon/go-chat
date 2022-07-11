import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { commentsState, loginState, Member, membersState } from "../state/atoms"
import { INIT_LOAD_QUERY, SUBSCRIPTION } from "../utils/client"

type InitLoadProps = {
    afterAddMember: () => void
}

const InitLoad: React.FC<InitLoadProps> = ({ afterAddMember }) => {
    const result = useQuery(INIT_LOAD_QUERY, { fetchPolicy: "cache-and-network"})
    const setComments = useSetRecoilState(commentsState)
    const setMembers = useSetRecoilState(membersState)
    const [ login, setLogin ] = useRecoilState(loginState)

    useEffect(() => {
        if (result && result.data) {
            if (result.data.messages.length > 0) {
                setComments(result.data.messages)
            }
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
                let retOb = Object.assign({}, prev);
                let messages = prev.messages ? [...prev.messages]: []
                let members  = prev.members ?  [...prev.members] : []

                if (resp.message) {
                    messages.push(resp.message)
                    retOb = Object.assign(retOb, { messages })
                }

                if (resp.user) {
                    members = [resp.user, ...members]
                    if (!members.some(m => m.user === login.user)) members.push(login)
                    setMembers(members)
                    retOb = Object.assign(retOb, { members })
                }

                if (resp.leave) {
                    members = members.filter((m: Member) => m.user !== resp.leave.user)
                    retOb = Object.assign(retOb, { members })
                }

                setComments(messages)
                return retOb
            }
        })
        setLogin({ ...login, disconnect })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return <></>
}
export default InitLoad
