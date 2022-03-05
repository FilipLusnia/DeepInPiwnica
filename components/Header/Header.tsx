import Link from 'next/link';
import { useContext } from 'react';
import {signOut } from "firebase/auth";
import { FirebaseContext } from '../Firebase/firebase';
import LogoutIcon from '../../public/icons/logout_icon.svg';

const Header = () => {

	const { isUserAuth, auth } = useContext(FirebaseContext);
	const deepSigns = [
		"this cellar smells like pizza",
		"drunk test: brzęczyszczykiewicz",
		"happy hours: 7pm-3am",
		"is your cup full, dude?",
		"guess who's deep"
	];

  	return (
		<div className='header_container'>
			<div className='header_logo_wrapper'>
				<h1 className='header_logo' data-text='DEEP IN PIWNICA'>DEEP IN PIWNICA</h1>
				{isUserAuth &&			
					<p className='header_quote' suppressHydrationWarning>
						{deepSigns[Math.floor(Math.random()*deepSigns.length)]}
					</p>
				}		
			</div>	
			{isUserAuth &&
				<nav className='header_nav'>
					<Link href='/'>
						<a className='header_nav_link'>
							Start
						</a>
					</Link>

					<Link href='/playlisty'>
						<a className='header_nav_link'>
							Playlisty
						</a>
					</Link>

					<Link href='/live'>
						<a className='header_nav_link'>
							Live
						</a>
					</Link>
					
					<Link href='/opcje'>
						<a className='header_nav_link'>
							Opcje
						</a>
					</Link>
					
					<a className='header_nav_link' onClick={() => signOut(auth)}>
						<LogoutIcon  className='header_nav_link_icon'/>
					</a>
				</nav>
			}
		</div>
  	)
}

export default Header;
