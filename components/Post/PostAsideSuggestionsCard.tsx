import Link from "next/link";
import { useState } from "react";
import PostUserInfoPopup from "./PostUserInfoPopup";

export default function PostAsideSuggestionsCard({
	id,
	image,
	title,
	userInfo,
}) {
	const { username, userSettings } = userInfo.restult;

	const [showPopup, setShowPopup] = useState(false);

	return (
		<div className="flex gap-3 ">
			<div className="w-16 h-16 min-w-[4rem] min-h-[4rem] rounded-md overflow-hidden">
				<Link title={title} href={`/blog/${id}`}>
					<img
						src={image}
						alt="Programadores Argentina"
						width={1000}
						height={1000}
						className="w-full h-full object-cover"
					/>
				</Link>
			</div>
			<div className="flex flex-col gap-1">
				<div className="flex gap-1.5 items-center">
					<Link
						href={`/pro/${username}`}
						title={username}
						className="w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] rounded-full overflow-hidden">
						<img
							src={
								userSettings
									? userSettings.avatar
									: "/userDefault.svg"
							}
							alt="Programadores Argentina"
							width={1000}
							height={1000}
							className="w-full h-full object-cover"
						/>
					</Link>
					<Link
						href={`/pro/${username}`}
						onMouseEnter={() => setShowPopup(true)}
						onMouseLeave={() => setShowPopup(false)}
						className="text-xs tracking-wide font-thin text-[#757575] hover:underline hover:text-[#F78001] relative inline-flex items-center justify-center">
						{showPopup && (
							<PostUserInfoPopup
								name={username}
								userSettings={userSettings}
								username={username}
							/>
						)}
						{username}
					</Link>
				</div>
				<p className="text-sm font-semibold tracking-tighter">
					<Link href={`/blog/${id}`}>{title}</Link>
				</p>
			</div>
		</div>
	);
}
