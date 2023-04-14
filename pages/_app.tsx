import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client/react'
import client from '../client'
import ProtectedRoute from '@/ProtectRoute'
import Head from 'next/head'
export default function App({ Component, pageProps,router }: AppProps) {

  return <ApolloProvider client={client}>
    <ProtectedRoute router={router}>
      <Head>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
    <Component {...pageProps} />
    </ProtectedRoute>
  </ApolloProvider>
}
