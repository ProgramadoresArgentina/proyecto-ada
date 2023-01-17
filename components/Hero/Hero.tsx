import { FC } from "react";
import { Hero_Avatars } from "./Hero_Avatars";
import { Hero_Button } from "./Hero_Button";
import { Hero_Image } from "./Hero_Image";
import { Hero_Paragraph } from "./Hero_Paragraph";
import { Hero_Pattern } from "./Hero_Pattern";
import { Hero_Title } from "./Hero_Title";

export const Hero: FC = () => (
	<section className="m-auto max-w-screen-xl min-h-max flex flex-col justify-start  items-center pt-2 md:pt-16 pb-20 md:pb-36 pl-2 sm:pl-5 md:pl-8 ">
		<div className=" w-full h-auto flex flex-row justify-start items-start relative ">
			<div className="w-full md:w-1/2 h-auto flex flex-col justify-start items-start gap-2 my-5 md:pt-6 lg:pt-1 pl-2 min-[360px]:pl-5 ">
				<Hero_Title />
				<Hero_Paragraph />
				<Hero_Avatars followers={20} />
				<Hero_Button />
				<Hero_Pattern />
			</div>
			<Hero_Image />
		</div>
	</section>
);
