import router from 'next/router';
import { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseContext } from '../components/Firebase/firebase';
import Header from '../components/Header/Header';

const Login = () => {
	const { auth } = useContext(FirebaseContext);
	const [ userData, setUserData ] = useState({
		email: '',
		pass: ''
	});
	const [ blockInterface, setBlockInterface ] = useState(false);

	const loginUser = () => {
		setBlockInterface(true);
		signInWithEmailAndPassword(auth, userData.email, userData.pass)
		.then(() => {
			setBlockInterface(false);
			router.push('/')
		})
		.catch(err => {
			setBlockInterface(false);
			alert("Błędne dane logowania. Kod błędu: " + err.code);
		});
	}

	return (
		<>
			<Header/>
			<div className='login_container'>
				<form className='login_window'>
					<h1>Pucuj się z danych osobowych</h1>
					<input value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} disabled={blockInterface} placeholder='Email'/>
					<input type='password' value={userData.pass} onChange={e => setUserData({...userData, pass: e.target.value})} disabled={blockInterface} placeholder='Hasło'/>
					<button onClick={() => loginUser()} disabled={blockInterface}>Zaloguj</button>
				</form>
			</div>
		</>
	)
}
export default Login;