import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../components/Firebase/firebase';

const Playlists = () => {
	const router = useRouter();
	const { isUserAuth } = useContext(FirebaseContext);

	useEffect(() => {
		(isUserAuth === false) && router.push("/login")
	}, [isUserAuth])

	return (
		<>
		
		</>
	)
}
export default Playlists;