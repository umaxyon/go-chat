import { useRouter } from "next/router"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { loginState } from "../state/atoms"

export const useLogout = () => {
    const router = useRouter()
    const login = useRecoilValue(loginState)
    const logout = useResetRecoilState(loginState)

    return () => {
        logout()
        if (login.disconnect) login.disconnect()
        router.reload()
    }
}