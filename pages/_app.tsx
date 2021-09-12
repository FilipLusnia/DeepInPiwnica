import type { AppProps } from 'next/app'
import '../styles/main.scss'
import Header from '../components/Header/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
