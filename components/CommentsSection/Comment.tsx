import Image from "next/image";
import { FC } from "react";
import { CommentProps } from "../../interface/types";

export const Comment: FC<CommentProps> = ({ image, text }: CommentProps) => {
	return (
		<div
			className="bg-[#161B22] w-60 min-h-[160px] px-1 py-2 mx-2 my-2 flex flex-col items-center justify-start gap-2 rounded-md shadow-md
						md:flex md:flex-row md:items-start md:justify-start md:pt-2 md:w-[300px] md:min-h-[100px] 
						lg:min-h-min">
			<Image
				alt="comment_avatar"
				className="rounded-full border-2 border-[#F78000] "
				height={45}
				src={image}
				width={45}
			/>
			<p
				className="text-center text-xs w-full text-white
							md:text-start">
				{text}
			</p>
		</div>
	);
};
