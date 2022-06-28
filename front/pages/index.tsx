import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Auth, { KEY_LOGIN } from '../components/auth'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const router = useRouter()
  const [ login, setLogin ] = useState<string>("")
  useEffect(() => {
    const login = sessionStorage.getItem(KEY_LOGIN)
    if (login) {
      setLogin(login)
    }
  }, [])

  const logout = () => {
    sessionStorage.clear()
    router.reload()
  }

  return (
    <Auth>
      {!login ? <></> : (
      <div className={styles.container}>
        <Head>
          <title>Go Chat</title>
          <meta name="description" content="sample chat application used GraphQL" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto p-4">
          <div className="flex justify-center gap-2">
            <input type="text" placeholder='入力してください'
              className="
                block w-2/3 text-base font-normal text-gray-700 bg-white bg-clip-padding
                border border-solid border-gray-300 rounded py-1.5 px-3 transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
            <button type="button"
              className="
                inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase 
                rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none 
                focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">送信</button>
          </div>
        </main>

        <footer className={styles.footer}>
          <button type="button" onClick={logout}
            className="
              inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase 
              rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none 
              focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out">退室</button>
        </footer>
      </div>
    )}
    </Auth>
  )
}

export default Home
