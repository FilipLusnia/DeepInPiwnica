import { createContext } from "react";
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

export const FirebaseContext = createContext<any>(null);

export const FirebaseProvider = ({children}: any) => {

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
    const firestore = getFirestore();
    const storage = getStorage();

    return(
        <FirebaseContext.Provider value={{ firestore, storage }}>
            {children}
        </FirebaseContext.Provider>
    )
}