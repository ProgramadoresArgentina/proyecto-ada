import {
	ChangeEvent,
	Dispatch,
	EventHandler,
	ReactNode,
	SetStateAction,
} from "react";

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

export interface ColumnTableProps {
	id: number;
	header: string;
}
export interface ArticleTableProps {
	id: number;
	title: string;
	image: string;
	url: string;
	createdAt: Date;
	views: number;
	likes?: number;
	comments?: number;
	bookmarks?: number;
}

export interface NotFoundProps {
	title: string;
	content: string;
	url: string;
	buttonName: string;
	showRegister?: boolean;
}

export interface AccordionRadioButtonProps {
	title: string;
	options: Array<OptiosAccordionProps>;
	radioGroup: string;
	userProp: string;
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface OptiosAccordionProps {
	id: number;
	value: string;
	name: string;
}

export interface HeaderDropdownProps {
	title: string;
	children?: any;
}

export interface UpdateProfileProps {
	openDialog: boolean;
	handleDialog: EventHandler<any>;
}

export interface ErrorMsgState {
	url: string;
	description: string;
	position: string;
}

export interface UserProfileProps {
	linkedin?: string;
	github?: string;
	behance?: string;
	portfolio?: string;
	seniority?: string;
	status?: string;
	position?: string;
	url?: string;
	description?: string;
}
