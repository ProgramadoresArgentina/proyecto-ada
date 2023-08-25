import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import getPosts from "../services/getPosts";
import getUsers from "../services/getUsers";

import {
	PostType,
	PostWithUserType,
	UsePostsStateType,
} from "../interface/postTypes";
import { UserType } from "../interface/userTypes";

export const usePosts = () => {
	const router = useRouter();
	const { id } = router.query;
	const [state, setState] = useState({
		post: undefined,
		isLoading: true,
		onError: false,
	});

	const getPostAndUser = useCallback(async (id: any) => {
		try {
			const post: PostType = await getPosts(id);
			const user: UserType = await getUsers(post.userId.toString());
			return { ...post, createdBy: user };
		} catch (err) {
			console.dir(err);
			throw new Error(err);
		}
	}, []);

	useEffect(() => {
		if (id) {
			setState((prev) => ({ ...prev, isLoading: true, onError: false }));
			getPostAndUser(id)
				.then((post) => {
					setState((prev) => ({ ...prev, post }));
				})
				.catch((err) => {
					setState((prev) => ({
						...prev,
						isLoading: false,
						onError: true,
					}));
				});
		}
	}, [id]);

	useEffect(() => {
		if (!state.post) return;
		setState((prev) => ({ ...prev, isLoading: false, onError: false }));
	}, [state.post]);

	return state;
};
