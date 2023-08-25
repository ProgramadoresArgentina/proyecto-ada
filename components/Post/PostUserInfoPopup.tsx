export default function PostUserInfoPopup({ name, userSettings, username }) {
	console.log({ userSettings });
	return (
		<div className="bg-white w-80 h-40 absolute top-[-10.75rem] shadow-xl p-4 rounded-2xl flex flex-col gap-2 z-10 border-[1px] border-solid border-[#cacaca]">
			<div className="w-0 h-0 border-solid border-8 border-transparent border-t-white absolute left-[calc(50%-8px)] bottom-[-14px]" />
			<div className="flex items-center gap-3">
				<picture
					title={name}
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
						className="w-[110%] h-[120%] object-cover"
					/>
				</picture>
				<div className="flex flex-col">
					<h2
						title={name}
						className="text-base tracking-wide leading-6 font-semibold">
						{name}
					</h2>
					<span
						title={`@${username}`}
						className="text-xs tracking-wide font-thin text-[#757575]">{`@${username}`}</span>
				</div>
			</div>
			<hr />
			{userSettings && userSettings.description && (
				<p className="text-sm tracking-wide font-thin text-[#757575] h-20 overflow-hidden text-ellipsis">
					{userSettings.description}
				</p>
			)}
		</div>
	);
}
