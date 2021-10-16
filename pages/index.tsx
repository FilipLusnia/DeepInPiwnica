import { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot, limit, orderBy, collection, getDocs } from 'firebase/firestore';
import { FirebaseContext } from '../components/Firebase/firebase';
import LoadingCover from '../components/LoadingCover';

const Home = () => {
  const { firestore, storage } = useContext(FirebaseContext);
  const [ releaseAnimations, setReleaseAnimations ] = useState(false);
  const [ showPostModal, setShowPostModal ] = useState(false);

  const getPosts = async () => {
    const posts = await getDocs(collection(firestore, "posts"));
    posts.forEach((doc: any) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  useEffect(() => {
    setTimeout(() => setReleaseAnimations(true), 1500);
    
    getPosts()
  }, [])

  return (
    <>
      {!releaseAnimations && <LoadingCover/>}

      {showPostModal &&
        <div className='postModal_background'>
          <div className='postModal_container'>
            <h1>Napisz post:</h1>
            <textarea placeholder='Czego?'/>
            <div className='postModal_bottom'>
              <div className='postModal_bottom_file'>
                <p>Dodaj zdjęcie lub film:</p>
                <input type='file'/>
              </div>
              <div className='postModal_bottom_buttons'>
                <button onClick={() => setShowPostModal(false)}>Anuluj</button>
                <button>Ok</button>
              </div>
            </div>
          </div>
        </div>
      }

      <div className='home_container'>
        <div className='home_background'/>
        <div className='home_hero'>
          <div className='home_hero_left'>
            <div className={releaseAnimations ? 'home_hero_title -revealed' : 'home_hero_title'}>
              <p>Zabawa <span>dopiero</span><br/>się zaczyna.</p>
              <p style={{ marginTop: 15 }}>( ͡° ͜ʖ ͡°)</p>
              <div/>
            </div>
          </div>
          <div className='home_hero_right'>
            <div className='home_hero_posts'>
              <div className='home_hero_posts_header'>
                <p>POSTY Z PIWNICY</p>
              </div>
              <div className='home_hero_posts_list'>

                <div className='home_hero_posts_list_post'>
                  <div className='post_name'>
                    <div>
                      <p>F</p>
                    </div>
                    <h1>Filip</h1>
                  </div>
                  <p>Reporting in - that's just a damn long post about nothing particular at all.</p>
                  <div className='post_img_wrapper'>
                    <img src='/125114536_747177902808550_8736110373896378721_n.png'/>
                  </div>
                </div>

                <div className='home_hero_posts_list_post'>
                  <div className='post_name'>
                    <div>
                      <p>F</p>
                    </div>
                    <h1>Filip</h1>
                  </div>
                  <p>Reporting in - that's just a damn long post about nothing particular at all.</p>
                  <div className='post_img_wrapper'>
                    <img src='/93796418_1127162380965971_3376712560949592064_o.jpg'/>
                  </div>
                </div>
                
              </div>
              <button onClick={() => setShowPostModal(true)} className='home_hero_posts_add'>
                <p>+</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
