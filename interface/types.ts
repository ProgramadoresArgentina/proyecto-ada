export interface AvatarsProps {
	followers: number;
	members?: [];
}
import { ReactNode } from "react";

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
