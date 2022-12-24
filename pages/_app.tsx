import { NextPage } from 'next'
import { AppProps } from 'next/app'
import '../styles/globals.css'

const MyApp: NextPage = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
