import type { AppProps } from 'next/app'
import { FirebaseProvider } from '../components/Firebase/firebase';
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header/Header';

import '../styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
	const [ loadBg, setLoadBg ] = useState(false);
	const [ revealBg, setRevealBg ] = useState(false);

	useEffect(() => {
		setLoadBg(true)
	}, [])
	

	return (
		<>
			<Head>
        		<title>Deep In Piwnica</title>
      			<link rel="icon" href="/favicon/favicon.ico" />
			</Head>
			<FirebaseProvider>
				<Header/>
				<div className='app_background_wrapper'>
					{loadBg &&
						<video 
							src='/background.mp4' 
							style={{ opacity: revealBg ? undefined : "0" }}
							onLoadedMetadata={() => setRevealBg(true)}
							className='app_background' 
							autoPlay 
							muted 
							loop
						/>
					}
				</div>
				<Component {...pageProps} />
			</FirebaseProvider>
		</>
	)
}
export default MyApp
