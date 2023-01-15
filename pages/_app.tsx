import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Nav from '../Components/Nav'
import '../styles/globals.css'

const MyApp: NextPage = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
