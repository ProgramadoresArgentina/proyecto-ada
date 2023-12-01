import PostAsideActions from "./PostAsideActions";
import PostAsideSuggestions from "./PostAsideSuggestions";
import PostAsideUserInfo from "./PostAsideUserInfo";

export default function PostAside({ post }) {
	const { username, description, userSettings, linkedIn, facebook, twitter } =
		post.createdBy.result;

	return (
		<aside className="w-full md:max-w-[22rem] p-6 relative md:sticky top-11">
			<PostAsideActions
				linkedIn={linkedIn}
				facebook={facebook}
				twitter={twitter}
			/>
			<div className="hidden md:flex flex-col gap-4">
				<PostAsideUserInfo
					name={username}
					username={username}
					userSettings={userSettings}
					description={description}
				/>
				<PostAsideSuggestions />
			</div>
		</aside>
	);
}
