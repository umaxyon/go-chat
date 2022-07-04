import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { loginState } from "../state/atoms";

const Login: NextPage = () => {
    const router = useRouter()
    const nameInput = useRef<HTMLInputElement>(null)
    const setLogin = useSetRecoilState(loginState)

    const onClickSignIn = () => {
        const user = nameInput.current!.value
        if (user) {
            setLogin({ user })
            router.replace("/")
        }
    }

    return (
        <div className="container mx-auto p-4 h-full flex">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm m-auto">
                <div className="mb-6">
                    <label htmlFor="inputName" className="inline-block mb-2 text-gray-700">Name</label>
                    <input type="text" id="inputName" placeholder="Enter name" ref={nameInput}
                        className="block w-full px-3 py-1.5 text-base font-normal
                        text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                        rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-describedby="emailHelp"  />
                </div>
                <button onClick={onClickSignIn}
                    className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase
                        rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign in</button>
            </div>
        </div>
    )
}
export default Login;