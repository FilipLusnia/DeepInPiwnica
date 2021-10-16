import { FirebaseProvider } from '../components/Firebase/firebase';
import type { AppProps } from 'next/app'
import '../styles/main.scss'
import Header from '../components/Header/Header';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <FirebaseProvider>
      <Header/>
      <Component {...pageProps} />
    </FirebaseProvider>
  )
}
export default MyApp
