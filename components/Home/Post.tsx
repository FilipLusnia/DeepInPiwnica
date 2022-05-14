const Post = ({post, lastPostRef}: {
	post:{
		name: string, 
		timestamp: {seconds: number, nanoseconds: number}, 
		media: string, 
		text: string
	},
	lastPostRef?: any
}) => {

	return (
		<div ref={lastPostRef ? lastPostRef : undefined} className='home_hero_posts_list_post'>
			<div className='post_top'>
				<div className='post_top_name'>
					<div>
						<p>{post.name.charAt(0)}</p>
					</div>
					<h1>{post.name}</h1>
				</div>
				<p className='post_top_timestamp'>
					{post.timestamp.seconds}
				</p>
			</div>
			<p>{post.text}</p>
			{post.media &&
				<div className='post_img_wrapper'>
					<img src={post.media}/>
				</div>
			}
		</div>
	)
}
export default Post;