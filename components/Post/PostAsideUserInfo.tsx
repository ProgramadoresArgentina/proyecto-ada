import Link from "next/link";

export default function PostAsideUserInfo({
	name,
	username,
	userSettings,
	description,
}) {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center gap-3 w-max text-white">
				<Link
					href={`/user/${username}`}
					title={name}
					className="w-16 h-16 min-w-[4rem] min-h-[4rem] rounded-full shadow-[0_4px_4px_#0002] flex items-center justify-center overflow-hidden object-cover">
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
				<div className="flex flex-col text-[#F78001]">
					<Link
						href={`/pro/${username}`}
						title={name}
						className="text-xl tracking-wide leading-6 font-medium">
						{name}
					</Link>
					{userSettings && username && (
						<Link
							href={`/pro/${username}`}
							title={`@${username}`}
							className="text-xs tracking-wide font-thin text-[#757575] hover:text-[#F78001]">
							{`@${username}`}
						</Link>
					)}
				</div>
			</div>
			<p className="text-sm tracking-wide font-thin text-gray-300">
				{description}
			</p>
		</div>
	);
}
