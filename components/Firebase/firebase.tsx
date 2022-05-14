import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
import { initializeApp, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, collection, query, where, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const FirebaseContext = createContext<any>(null);

export const FirebaseProvider = ({children}: any) => {
	const router = useRouter();
	const [ fallback, setFallback ] = useState(true);
	const [ isUserAuth, setIsUserAuth ] = useState<boolean>();
	const [ firestore, setFirestore ] = useState<any>();
	const [ storage , setStorage ] = useState<any>();

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

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async user => {
			fallback && setFallback(false);
			if(user){
				router.push("/")
				setIsUserAuth(true)	
				const frstr = getFirestore();
				setFirestore(frstr);
				setStorage(getStorage());

				const userName = await getDoc(doc(frstr, "users", user.uid))
				updateProfile(user, {
					displayName: userName.data()?.name
				})
			} else {
				router.push("/login")
				setIsUserAuth(false)
			}
		})

		return () => unsub();
	}, [])
    return(
        <FirebaseContext.Provider value={{ app, auth, isUserAuth, firestore, storage }}>
			{fallback ?
				<div className='app_fallback'/>
			:
				<div className='app_wrapper'>
					{children}
				</div>
			}
        </FirebaseContext.Provider>
    )
}