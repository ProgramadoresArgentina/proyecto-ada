import { useEffect, useState } from "react";
import { PostWithUserType } from "../../interface/postTypes";

export default function PostContentHeader({
	coverImage,
	title,
}: PostWithUserType) {
	const [zoom, setZoom] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => setZoom(false));
	}, []);

	return (
		<div
			className={`${
				zoom
					? " animate-fadeIn fixed w-full h-screen bg-white bg-opacity-90 top-0 left-0 z-50 flex items-center justify-center"
					: " aspect-[16/6] overflow-hidden rounded-xl"
			}`}
			onClick={() => setZoom(!zoom)}>
			<picture
				title={title}
				className="w-full transition-all overflow-hidden cursor-zoom-in">
				<img
					src={coverImage}
					alt="Programadores Argentina"
					width={2000}
					height={2000}
					className="w-full h-full object-cover"
				/>
			</picture>
		</div>
	);
}
