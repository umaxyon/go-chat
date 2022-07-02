import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const KEY_USER = "KEY_USER"
export const KEY_LOGIN = "KEY_LOGIN"

type AuthProps = {
    children: React.ReactNode
}

const Auth: React.FC<AuthProps> = ({ children }) => {
    const router = useRouter()
    const [user, setUser] = useState<string | null>()

    useEffect(() => {
        if (router.isReady) {
            if (!user) {
                const loginUser = sessionStorage.getItem(KEY_USER)
                if (loginUser) {
                    setUser(loginUser)
                    sessionStorage.setItem(KEY_LOGIN, loginUser)
                } else {
                    router.replace("/login")
                }
            }
        }
    }, [])

    return <>{children}</>
}

export default Auth;