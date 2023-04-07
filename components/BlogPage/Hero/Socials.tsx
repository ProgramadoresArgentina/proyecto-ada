import Image from "next/image";
import { LINKS_URL_SOCIALS } from "../../../constants/constants";
import { openInNewTab } from "../../../helpers/openInNewTab";

import { FC } from "react";
import Fb from "../../../public/footer/fb.svg";
import Ig from "../../../public/footer/ig.svg";
import In from "../../../public/footer/in.svg";

const classSocialContainer =
	"w-6 h-6 rounded-full bg-greyBackground flex justify-center items-center transition duration-150 ease-out cursor-pointer hover:ease-in sm:w-8 sm:h-8";
const classSocialImage = " w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]";

export const Socials: FC = () => (
	<div
		className="absolute top-5 right-4 flex flex-col justify-start items-center gap-y-2
					sm:top-7 sm:right-8
					md:top-10 md:right-12
					lg:top-16 lg:right-16">
		<div
			className={`${classSocialContainer} hover:bg-[#C13584] `}
			onClick={() => openInNewTab(LINKS_URL_SOCIALS.instagram)}>
			<Image
				alt="Programadores Argentina Instagram"
				className={`-ml-[2px] ${classSocialImage}`}
				src={Ig}
			/>
		</div>
		<div
			className={`${classSocialContainer} hover:bg-[#3b5998]`}
			onClick={() => openInNewTab(LINKS_URL_SOCIALS.facebook)}>
			<Image
				alt="Programadores Argentina Facebook"
				className={classSocialImage}
				src={Fb}
			/>
		</div>
		<div
			className={`${classSocialContainer} hover:bg-[#0e76a8]`}
			onClick={() => openInNewTab(LINKS_URL_SOCIALS.linkedin)}>
			<Image
				alt="Programadores Argentina LinkedIn"
				className={classSocialImage}
				src={In}
			/>
		</div>
	</div>
);
