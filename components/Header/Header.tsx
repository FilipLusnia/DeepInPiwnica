import Link from 'next/link';

const Header = () => {
  return (
    <div className='header_container'>
        <div className='header_logo_wrapper'>
            <h1 className='header_logo' data-text='DEEP IN PIWNICA'>DEEP IN PIWNICA</h1>
        </div>

        <nav className='header_nav'>
            <Link href='/playlisty'>
                <a className='header_nav_link'>
                    Playlisty
                </a>
            </Link>

            <Link href='/'>
                <a className='header_nav_link'>
                    Live
                </a>
            </Link>
            
            <Link href='/'>
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
