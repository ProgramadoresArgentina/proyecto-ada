import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

const MyApp: NextPage = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
