import { UserType } from "./userTypes";

export interface Post {
	id: string;
	image: string;
	title: string;
	content: string;
	views: number;
	createdAt?: string;
	createdBy?: string;
	hashtags?: string;
	userId?: number;
	user?: number;
}
export interface PostUSerType {
	post: Post;
}

export interface PostWithUserType {
	id?: string;
	content?: string;
	coverImage?: string;
	createdAt?: string;
	createdBy?: UserType;
	hashtags?: string;
	title?: string;
}

export interface UsePostsStateType {
	post?: Post | undefined;
	suggestionsPosts?: PostWithUserArrType | undefined;
	isLoading?: boolean;
	onError?: boolean;
}

// export type PostArrType = PostType[];
export type PostWithUserArrType = PostWithUserType[];
