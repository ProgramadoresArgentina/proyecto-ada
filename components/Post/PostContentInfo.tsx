import Link from "next/link";

export default function PostContentInfo({ content, createdBy, views }) {
	const { username, updateAt, userSettings } = createdBy.result;

	const getReadTime = () => {
		const wordsPerMinute = 200;
		const textLength = content.length;
		const readTime = Math.floor(textLength / wordsPerMinute);
		return readTime === 0 ? 1 : readTime;
	};

	const getTime = () => {
		const newDate = new Date(updateAt);
		const localTime = newDate.toLocaleTimeString();
		const localDate = newDate.toLocaleDateString();
		return ` ${localTime} - ${localDate}`;
	};

	return (
		<div>
			<div className="flex items-center gap-3 w-max">
				<Link
					href={`/pro/${username}`}
					title={username}
					className="w-12 min-w-[3rem] aspect-square rounded-full shadow-[0_4px_4px_#0002] flex items-center justify-center overflow-hidden object-cover">
					<img
						src={
							userSettings && userSettings.avatar
								? userSettings.avatar
								: "/userDefault.svg"
						}
						alt="Programadores Argentina"
						width={1000}
						height={1000}
						className="w-full h-full object-cover"
					/>
				</Link>
				<div className="flex flex-col">
					<Link
						href={`/pro/${username}`}
						title={username}
						className="text-base tracking-wide leading-6 font-medium text-[#F78001]">
						{username}
					</Link>
					<div className="flex gap-2 text-xs tracking-wide font-thin cursor-default text-[#AAAAAA]">
						<span title={getTime()}>{getTime()}</span>
						<span>&middot;</span>
						<span title={`${getReadTime()} min read`}>
							{getReadTime()} min read
						</span>
						<span>&middot;</span>
						<span title={`${views} vistas`}> {views} vistas</span>
					</div>
				</div>
			</div>
		</div>
	);
}
