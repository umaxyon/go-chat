import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { useRecoilState, useRecoilValue } from "recoil"
import { CONNECTION_KEEP } from "../utils/client"
import { connectIntervalSelector, loginState } from "../state/atoms"
import { useLogout } from "../hooks/logout"


const KeepAlive = () => {
    const [ lastTime, setLastTime ] = useRecoilState(connectIntervalSelector)
    const [ connectionKeep ] = useMutation(CONNECTION_KEEP)
    const login = useRecoilValue(loginState)
    const logout = useLogout()
    const [ now, setNow ] = useState(new Date().getTime())

    useEffect(() => {
        // console.log(`now=${now} lastTime=${lastTime}`)
        if (now - lastTime > 45 * 1000) {
            (async() => await connectionKeep({ variables: { ...login } })
                .catch(() => {
                    logout()
                }))()
            setLastTime(new Date().getTime())
        }

        setTimeout(() => {
            setNow(new Date().getTime())
        }, 6000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [now])
    return <></>
}

export default KeepAlive
