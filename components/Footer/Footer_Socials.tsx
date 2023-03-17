import Image from "next/image";
import { FC } from "react";
import Ds from "../../public/footer/ds.svg";
import Fb from "../../public/footer/fb.svg";
import Gh from "../../public/footer/gh.svg";
import Ig from "../../public/footer/ig.svg";
import In from "../../public/footer/in.svg";

import { LINKS_URL_SOCIALS } from "../../constants/constants";
import { openInNewTab } from "../../helpers/openInNewTab";

const classSocialContainer =
	"w-10 h-10 rounded-full bg-greyDark flex justify-center items-center transition duration-150 ease-out cursor-pointer sm:w-10 h-10  hover:ease-in";

const classSocialImage = " w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]";

export const Footer_Socials: FC = () => (
	<div
		className="w-full flex justify-start items-center gap-2
                        sm:gap-4">
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
			className={`${classSocialContainer} hover:bg-[#333]`}
			onClick={() => openInNewTab(LINKS_URL_SOCIALS.github)}>
			<Image
				alt="Programadores Argentina GitHub"
				className={classSocialImage}
				src={Gh}
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
			className={`${classSocialContainer} hover:bg-[#7289da]`}
			onClick={() => openInNewTab(LINKS_URL_SOCIALS.discord)}>
			<Image
				alt="Programadores Argentina Discord"
				className={classSocialImage}
				src={Ds}
			/>
		</div>
	</div>
);
