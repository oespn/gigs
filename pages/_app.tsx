import '../styles/globals.css'
import { AppWrapper } from '../context/state'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <AppWrapper>
    <Component {...pageProps} />
  </AppWrapper>
  )
}

export default MyApp
