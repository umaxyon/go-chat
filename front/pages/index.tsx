import { ApolloProvider } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import Auth from '../components/auth'
import { client } from '../utils/client'
import CommentFeed from '../components/CommentFeed'
import CommentSenderPanel from '../components/CommentSenderPanel'
import MembersPanel from '../components/MembersPanel'
import { loginState } from '../state/atoms'

const Home: NextPage = () => {
  const router = useRouter()
  const login = useRecoilValue(loginState)
  const logout = useResetRecoilState(loginState)

  const onClickLogout = () => {
    logout()
    if (login.disconnect) login.disconnect()
    router.reload()
  }

  return (
    <ApolloProvider client={client}>
    <Auth>
      {!login ? <></> : (
      <div className="w-full h-full">
        <Head>
          <title>Go Chat</title>
          <meta name="description" content="sample chat application used GraphQL" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container flex mx-auto p-4 h-full">
          <div className="flex gap-2 w-full h-2/3 my-auto">
            <div className="flex flex-col border border-gray-300 w-36 h-full rounded-l">
              <MembersPanel />
              <div className="flex align-middle flex-col w-full bg-yellow-100 pb-3 border-t border-gray-300">
                <p className="p-2"><b>{login.user}</b><br/><small>で参加中</small></p>
                <button type="button" onClick={onClickLogout}
                  className="
                    inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase
                    rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none 
                    focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out mx-auto">退室</button>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full h-full my-auto">
              <CommentFeed user={login.user} />
              <CommentSenderPanel user={login.user} />
            </div>
          </div>
        </main>
      </div>
    )}
    </Auth>
    </ApolloProvider>
  )
}

export default Home
