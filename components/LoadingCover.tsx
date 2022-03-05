import { useState, useEffect } from "react";

const LoadingCover = () => {
	const [ renderCover, setRenderCover ] = useState(true);

	useEffect(() => {
		setTimeout(() => setRenderCover(false), 1500);
	}, [])

	return (
		<>
		{renderCover &&
			<div className="loading_cover">
				<div className="loading_cover_plate -left"/>
				<div className="loading_cover_plate -right"/>
			</div>
		}
		</>
	)
}

export default LoadingCover;
