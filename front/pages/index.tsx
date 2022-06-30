import { ApolloProvider } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Auth, { KEY_LOGIN } from '../components/auth'
import { client } from '../components/client'
import CommentFeedWithData from '../components/CommentFeed'
import CommentSenderPanel from '../components/CommentSenderPanel'
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
    <ApolloProvider client={client}>
    <Auth>
      {!login ? <></> : (
      <div className={styles.container}>
        <Head>
          <title>Go Chat</title>
          <meta name="description" content="sample chat application used GraphQL" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto p-4">
          <CommentFeedWithData user={login} />
          <CommentSenderPanel user={login} />
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
    </ApolloProvider>
  )
}

export default Home
