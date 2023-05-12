import { Dispatch, ReactNode, SetStateAction } from "react";

export interface AvatarsProps {
	followers: number;
	members?: [];
}

export interface CommentProps {
	date?: Date;
	id?: number;
	image: string;
	name?: string;
	text: string;
}

export interface ComentsSectionProps {
	commentsList: CommentProps[];
}

export interface MarqueeCustomProps {
	children: ReactNode[];
	marqueeVelocity: number;
	onFinish?: () => void;
	onInit?: () => void;
	scatterRandomly: boolean;
}

export type SetState<T> = Dispatch<SetStateAction<T>>;
