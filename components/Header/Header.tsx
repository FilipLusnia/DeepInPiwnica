import Link from 'next/link';
import LogoIcon from '../../public/dipLogo.svg';

const Header = () => {
  return (
    <div className='header_container'>
        <LogoIcon className='header_logo'/>

        <nav className='header_nav'>
            <Link href='/playlisty'>
                <a className='header_nav_link'>
                    Playlisty
                </a>
            </Link>

            <Link href=''>
                <a className='header_nav_link'>
                    Live
                </a>
            </Link>
            
            <Link href=''>
                <a className='header_nav_link'>
                    Tablica
                </a>
            </Link>
            
            <Link href='/opcje'>
                <a className='header_nav_link'>
                    Opcje
                </a>
            </Link>
        </nav>
    </div>
  )
}

export default Header;
