import { NextPage } from 'next'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import NavBar from '../components/NavBar'

const MyApp: NextPage = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
