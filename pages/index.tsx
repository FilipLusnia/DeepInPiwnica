import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { query, limit, orderBy, collection, onSnapshot, getDocs, startAfter, addDoc } from 'firebase/firestore';
import { FirebaseContext } from '../components/Firebase/firebase';
import Modal from '../components/Modal/Modal';
import Post from '../components/Home/Post';

const Home = () => {
	const router = useRouter();
	const fileBtnRef = useRef<HTMLInputElement | null>(null);
	const postsContainerRef = useRef<HTMLDivElement | null>(null);
	const { auth, isUserAuth, firestore, storage } = useContext(FirebaseContext);
	const [ releaseAnimations, setReleaseAnimations ] = useState(false);
	const [ showPostModal, setShowPostModal ] = useState(false);
	const [ newPostText, setNewPostText ] = useState('');
	const [ posts, setPosts ] = useState<{
		name: string, 
		timestamp: {seconds: number, nanoseconds: number}, 
		media: string, 
		text: string}[]
	>([]);
	const [ lastFirestoreEntry, setLastFirestoreEntry ] = useState<any>(0);
	const ignoreInitSnap = useRef(true);
	const [ didAllPostsFetch, setDidAllPostsFetch ] = useState(false);
	const [ arePostsLoading, setArePostsLoading ] = useState(true);
	const lenny = [
		"( ͡° ͜ʖ ͡°)",
		"༼ ͡• ͜໒ ͡• ༽",
		"(͡o‿O͡)",
		"(⌐■_■)ﾉ",
		"('ʘᗩʘ)"
	];
	const [ whichLenny, setWhichLenny ] = useState('');
	
	const observer = useRef<any>(null);
	const lastPost = useCallback((el: HTMLDivElement) => {
		if(arePostsLoading || !firestore) return;
		if(observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if(entries[0].isIntersecting && !didAllPostsFetch) getPosts();
		})
		el && observer.current.observe(el);
	}, [didAllPostsFetch, arePostsLoading, firestore])

	const getQuerySettings = () => {
		let querySettings: any;
		posts.length === 0 ?
			querySettings = query(
				collection(firestore, "posts"),
				orderBy('timestamp', "desc"),
				limit(5)
			)
		:
			querySettings = query(
				collection(firestore, "posts"),
				orderBy('timestamp', "desc"),
				startAfter(lastFirestoreEntry),
				limit(5)
			)
		return querySettings;
	}
	
	const getPosts = async () => {
		setArePostsLoading(true);

		const fetchedDocs = await getDocs(getQuerySettings());
		fetchedDocs.forEach((doc: any) => {
			setPosts(prev =>  [...prev, doc.data()])
		});
		
		fetchedDocs.empty ? 
			setDidAllPostsFetch(true) 
			: 
			setLastFirestoreEntry(fetchedDocs.docs[fetchedDocs.docs.length - 1])
		setArePostsLoading(false);
	}
	
	const uploadPost = async () => {
		if(isUserAuth && firestore){
			await addDoc(collection(firestore, "posts"), {
				name: auth.currentUser.displayName,
				text: newPostText,
				timestamp: new Date()
			});
			setShowPostModal(false)
			setNewPostText('')
		}
	}
	
	useEffect(() => {
		const timeout = setTimeout(() => setReleaseAnimations(true), 1500);
		setWhichLenny(lenny[Math.floor(Math.random()*lenny.length)]);

		return () => clearTimeout(timeout)
	}, [])
	
	useEffect(() => {
		if(firestore){
			getPosts()
			.then(() => {
				onSnapshot(query(
					collection(firestore, "posts"),
					orderBy('timestamp', 'desc'),
					limit(1)
				), 
				(snap: any) => {
					ignoreInitSnap.current ?
						ignoreInitSnap.current = false
					:
						snap.forEach((doc: any) => {
							!ignoreInitSnap.current && setPosts(prev => [doc.data(), ...prev])
						});
				})
			})
		}
	}, [firestore])

	useEffect(() => {
		(isUserAuth === false) && router.push("/login")
	}, [isUserAuth])

	return (
	<>
		{showPostModal &&
			<Modal>
				<div className='postModal'>
					<h1>Napisz post:</h1>
					<textarea value={newPostText} onChange={e => setNewPostText(e.target.value)} placeholder='Czego?'/>
					<div className='postModal_bottom'>
						<div className='postModal_bottom_file'>
							<button onClick={() => fileBtnRef.current?.click()} onMouseDown={e => e.preventDefault()} >+ Zdjęcie lub film</button>
							<input ref={fileBtnRef} type='file' style={{ display: 'none' }}/>
						</div>
						<div className='postModal_bottom_buttons'>
							<button onClick={() => setShowPostModal(false)} onMouseDown={e => e.preventDefault()} >Anuluj</button>
							<button onMouseDown={e => e.preventDefault()} onClick={() => uploadPost()}>Ok</button>
						</div>
					</div>
				</div>
			</Modal>
		}

		<div className='home_container'>
			<div className='home_hero'>
				<div className='home_hero_left'>
					<div className={releaseAnimations ? 'home_hero_title -revealed' : 'home_hero_title'}>
						<p>Zabawa <span>dopiero</span><br/>się zaczyna.</p>
						<p style={{ marginTop: 15 }}>{whichLenny}</p>
						<div/>
					</div>
				</div>
				<div className='home_hero_right'>
					<div className='home_hero_posts'>
						<div className='home_hero_posts_header'>
							<p>POSTY Z PIWNICY</p>
						</div>
						<div className='home_hero_posts_list' ref={postsContainerRef}>
							{posts ?
								posts.map((post, i) => {
									if(posts.length === i + 1){
										return <Post lastPostRef={lastPost} post={post} key={i}/>
									} else {
										return <Post post={post} key={i}/>
									}
								})
							:
								<p className='home_hero_posts_loading'>Ładowanie...</p>
							}
							{arePostsLoading && <p className='home_hero_posts_loading'>Ładowanie...</p>}
						</div>
						<button onClick={() => setShowPostModal(true)} className='home_hero_posts_add' onMouseDown={e => e.preventDefault()} >
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
