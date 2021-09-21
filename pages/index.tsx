import Head from 'next/head';
import { useState, useEffect } from 'react';
import LoadingCover from '../components/LoadingCover';

const Home = () => {
  const [ killCover, setKillCover ] = useState(false);

  useEffect(() => {
    setTimeout(() => setKillCover(true), 1500)
  }, [])

  return (
    <>
      {!killCover && <LoadingCover/>}
      <div className='home_container'>
        <div className='home_background'/>
        <div className='home_hero'>
          <div className='home_hero_left'>
            <p>Zabawa <span>dopiero</span><br/>się zaczyna. ( ͡° ͜ʖ ͡°)</p>
            <div/>
          </div>
          <div className='home_hero_right'>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
