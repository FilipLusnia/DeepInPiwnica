import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
import { initializeApp, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const FirebaseContext = createContext<any>(null);

export const FirebaseProvider = ({children}: any) => {
	const router = useRouter();
	const [ fallback, setFallback ] = useState(true);
	const [ isUserAuth, setIsUserAuth ] = useState(false);

    const firebaseConfig = {
        apiKey: "AIzaSyDcssRfPB3FPMAK1noSLPrtzx-WKlCSAWo",
        authDomain: "deep-in-piwnica.firebaseapp.com",
        projectId: "deep-in-piwnica",
        storageBucket: "deep-in-piwnica.appspot.com",
        messagingSenderId: "156333955764",
        appId: "1:156333955764:web:230d0b7216ea0d1b33d5e1",
        measurementId: "G-TJDMVWE33H"
    };
    initializeApp(firebaseConfig);
	
    const app = getApp();
    const auth = getAuth();
    const firestore = getFirestore();
    const storage = getStorage();

	useEffect(() => {
		if(app){
			setFallback(false);
			const unsub = onAuthStateChanged(auth, user => {
				unsub();
				if(user){
					router.push("/")
					setIsUserAuth(true)	
				} else {
					router.push("/login")
					setIsUserAuth(false)	
				}
			})
		}
	}, [app, auth])
	
    return(
        <FirebaseContext.Provider value={{ app, auth, isUserAuth, firestore, storage }}>
			{fallback ?
				<div className='app_fallback'/>
			:
				children
			}
        </FirebaseContext.Provider>
    )
}