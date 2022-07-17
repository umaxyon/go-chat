import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../state/atoms";


type LoginCheckerProps = {
    children: React.ReactNode
}

const LoginChecker: React.FC<LoginCheckerProps> = ({ children }) => {
    const router = useRouter()
    const user = useRecoilValue(loginState)

    useEffect(() => {
        if (router.isReady) {
            if (!user) {
                router.replace("/login")
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>{children}</>
}

export default LoginChecker;