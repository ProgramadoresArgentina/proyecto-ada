import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Spinner from "../Spinner";
import PostAsideSuggestionsCard from "./PostAsideSuggestionsCard";

export default function PostAsideSuggestions() {
	const { data, loading, fetchData } = useFetch();
	const [suggestions, setSuggestions] = useState(null);
	const [loadingCards, setLoadingCards] = useState(false);

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		fetchData(`/api/articles/related/${id}`);
	}, []);

	useEffect(() => {
		if (!data) return;
		if (!data.relatedBlogs || data.relatedBlogs.length < 1) return;
		const urlsToFetch = [];
		setLoadingCards(true);

		data?.relatedBlogs?.forEach((post: any) =>
			urlsToFetch.push(`/api/users/${post.userId}`)
		);

		const promises = urlsToFetch.map(async (apiEndpoint) => {
			const response = await fetch(apiEndpoint);
			return response.json();
		});

		Promise.all(promises)
			.then((responses) => {
				setSuggestions(
					responses.map((user, index) => ({
						userInfo: user,
						...data.relatedBlogs[index],
					}))
				);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setLoadingCards(false));
	}, [data]);

	const showSuggestions = () => {
		if (data && !suggestions && !loadingCards)
			return <div>No tenemos sugerencias</div>;

		if (loadingCards) return <Spinner />;

		return suggestions.map(({ id, image, title, userInfo, url }) => (
			<PostAsideSuggestionsCard
				key={id}
				id={id}
				image={image}
				title={title}
				userInfo={userInfo}
				url={url}
			/>
		));
	};

	if (loading) return <Spinner />;

	return (
		<div className="flex flex-col gap-3 text-gray-300">
			<h2 className="font-normal text-xl">Sugerencias para leer</h2>
			<div className="flex flex-col gap-3">{showSuggestions()}</div>
		</div>
	);
}
